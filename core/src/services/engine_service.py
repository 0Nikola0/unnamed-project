from datetime import datetime
from llama_index.llms.groq import Groq
from llama_index.embeddings.jinaai import JinaEmbedding
from llama_index.core.base.llms.types import ChatMessage
from llama_index.core import VectorStoreIndex, Settings
from llama_index.vector_stores.qdrant import QdrantVectorStore

import settings
from services import chat_history_service
from services.qdrant_service import qdrant_client
from models import ChatHistory, ChatHistoryMessage, IncomingMessage


def instance_engine():
    """
    Instances a chat engine

    Parameters:
        - None

    Returns:
        - engine: BaseChatEngine; The instanced chat engine
    """
    print("INSTANCING ENGINE")

    Settings.llm = Groq(
        model=settings.GROQ_MODEL,
        api_key=settings.GROQ_API_KEY,
    )

    Settings.embed_model = JinaEmbedding(
        model=settings.JINAAI_MODEL,
        api_key=settings.JINAAI_API_KEY,
    )

    vector_store = QdrantVectorStore(
        client=qdrant_client,
        collection_name=settings.QDRANT_COLLECTION,
    )

    index = VectorStoreIndex.from_vector_store(
        vector_store=vector_store,
        # TODO embed model mos ne mora da se navede tuka
        embed_model=Settings.embed_model,
    )

    return index.as_chat_engine()
    # return index.as_query_engine()


QUERY_ENGINE = instance_engine()


def transform_chat_history(chat_history: ChatHistory) -> list[ChatMessage | None]:
    """
    Transforms the chat history into a list of LlamaIndex' ChatMessage models

    Parameters:
        - chat_history: chat history that we want to transform

    Returns:
        - list of ChatMessages or an empty list (if no messages are present in the chat)
    """
    return [ChatMessage(role=m.role, content=m.content) for m in chat_history.messages] if chat_history.messages else []


def query(message: IncomingMessage, chat_history: ChatHistory) -> str:
    """
    Runs the prompt through the LLM

    Parameters:
        - message: ... # TODO to be continued mrze me sea dokumentacija 
    """

    chat_history = transform_chat_history(chat_history)

    response = QUERY_ENGINE.chat(message.content, chat_history=chat_history).response

    # TODO razdeli go ovoa nekako da e nadvor od ovaa funkc
    user_asked_message = ChatHistoryMessage(role="user", content=message.content, sent_at=str(datetime.now()))
    system_response_message = ChatHistoryMessage(role="assistant", content=response, sent_at=str(datetime.now()))
    chat_history_service.append_message(message.chat_id, user_asked_message)
    chat_history_service.append_message(message.chat_id, system_response_message)

    return response
