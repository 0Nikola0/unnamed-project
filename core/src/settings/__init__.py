import os
from dotenv import load_dotenv


load_dotenv()


# === Groq === #
GROQ_MODEL = os.environ["GROQ_MODEL"]
GROQ_API_KEY = os.environ["GROQ_API_KEY"]


# === JinaAI === #
JINAAI_MODEL = os.environ["JINAAI_MODEL"]
JINAAI_API_KEY = os.environ["JINAAI_API_KEY"]


# === Qdrant === #
QDRANT_HOST = os.environ["QDRANT_HOST"]
QDRANT_PORT = os.environ["QDRANT_PORT"]
QDRANT_COLLECTION = os.environ["QDRANT_COLLECTION"]


# === MongoDB === #
MONGO_URL = os.environ["MONGO_URL"]
