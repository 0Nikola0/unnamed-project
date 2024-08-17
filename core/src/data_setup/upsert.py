import tiktoken
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.core import Settings, SimpleDirectoryReader, VectorStoreIndex, StorageContext

import settings
from services.qdrant_service import qdrant_client

# --- LLM Setup --- #
Settings.embed_model = OpenAIEmbedding(
    model="text-embedding-3-small", embed_batch_size=100
)
Settings.llm = OpenAI(model="gpt-4o-mini", temperature=0.1)
Settings.tokenizer = tiktoken.encoding_for_model("gpt-4o-mini").encode


def upsert():
    print("Starting upsert")
    
    documents = SimpleDirectoryReader("src/data/processed/predmetnik").load_data()
    vector_store = QdrantVectorStore(client=qdrant_client, collection_name=settings.QDRANT_COLLECTION)

    if vector_store._collection_exists(settings.QDRANT_COLLECTION):
        raise "Collection already exists. Change collection name env variable"
    
    storage_context = StorageContext.from_defaults(vector_store=vector_store)
    VectorStoreIndex.from_documents(documents, storage_context=storage_context)
    
    print("Finished upsert")
