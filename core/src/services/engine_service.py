from datetime import datetime

import tiktoken
from llama_index.llms.openai import OpenAI
from llama_index.core.schema import IndexNode
from llama_index.core import VectorStoreIndex, Settings
from llama_index.core.base.llms.types import ChatMessage
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core.chat_engine.types import BaseChatEngine
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.core.postprocessor import LLMRerank, SentenceEmbeddingOptimizer

# TODO MN BITNO!!!!!!
# Tuka ima razlicni INDEXi vidi koj za so e i koj e najdobar
from llama_index.core import SummaryIndex, GPTListIndex

import settings
from services import chat_history_service
from services.qdrant_service import qdrant_client
from models import ChatHistory, ChatHistoryMessage, IncomingMessage


def instance_engine() -> BaseChatEngine:
    """
    Instances a chat engine

    Parameters:
        - None

    Returns:
        - engine: The instanced chat engine
    """
    print("INSTANCING ENGINE")
    Settings.embed_model = OpenAIEmbedding(
        model="text-embedding-3-small", embed_batch_size=100
    )

    Settings.llm = OpenAI(
        model=settings.OPENAI_MODEL_NAME,
        temperature=settings.OPENAI_MODEL_TEMPERATURE,
    )

    Settings.tokenizer = tiktoken.encoding_for_model(settings.OPENAI_MODEL_NAME).encode

    vector_store = QdrantVectorStore(
        client=qdrant_client, collection_name=settings.QDRANT_COLLECTION
    )

    index = VectorStoreIndex.from_vector_store(
        vector_store=vector_store,
        embed_model=Settings.embed_model,
    )

    predmetnik_index = IndexNode(
        index_id="predmetnik_index",
        obj=index.as_retriever(similarity_top_k=settings.SIMILARITY_TOP_K),
        text="predmetnik_index",
    )

    summary_index = SummaryIndex(
        objects=[
            predmetnik_index,
        ]
    )

    reranker = LLMRerank(
        top_n=settings.RERANKER_TOP_N,
        choice_batch_size=settings.SIMILARITY_TOP_K,
    )

    # nema bas nekoja razlika
    # sentence_optimizer = SentenceEmbeddingOptimizer(
    #     percentile_cutoff=settings.SENTENCE_PERCENTILE_CUTOFF
    # )

    query_engine = summary_index.as_chat_engine(
        response_mode="compact", verbose=False,
        node_postprocessors=[reranker, ],
    )

    return query_engine


QUERY_ENGINE = instance_engine()


def transform_chat_history(chat_history: ChatHistory) -> list[ChatMessage | None]:
    """
    Transforms the chat history into a list of LlamaIndex' ChatMessage models

    Parameters:
        - chat_history: chat history that we want to transform

    Returns:
        - list of ChatMessages or an empty list (if no messages are present in the chat)
    """
    return (
        [ChatMessage(role=m.role, content=m.content) for m in chat_history.messages]
        if chat_history.messages
        else []
    )


def query(message: IncomingMessage, chat_history: ChatHistory) -> str:
    """
    Runs the prompt through the LLM

    Parameters:
        - message: the message the user sent to the LLM
        - chat_history: history of the messages in the interraction with the llm in the current chat

    Returns:
        - response: the response the LLM gave to the message
    """

    chat_history = transform_chat_history(chat_history)
    response = QUERY_ENGINE.chat(message.content, chat_history=chat_history).response

    # --- Updates the chat history with the new messages --- #
    user_asked_message = ChatHistoryMessage(
        role="user",
        content=message.content,
        sent_at=str(datetime.now()),
    )
    system_response_message = ChatHistoryMessage(
        role="assistant",
        content=response,
        sent_at=str(datetime.now()),
    )
    chat_history_service.append_message(message.chat_id, user_asked_message)
    chat_history_service.append_message(message.chat_id, system_response_message)
    # ----------------------------------------------------- #

    return response
