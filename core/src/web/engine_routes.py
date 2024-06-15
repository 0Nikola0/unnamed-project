from fastapi import APIRouter

from models import ChatHistory, IncomingMessage
from services import engine_service
from services import chat_history_service


router = APIRouter(
    prefix="/engine",
    tags=["engine"],
    responses={404: {"description": "Not found"}},
)


@router.post("/query")
async def read_items(message: IncomingMessage):
    chat_history = chat_history_service.get_or_create_chat(message.chat_id)
    # return chat_history
    return engine_service.query(message, chat_history)


@router.get("/chat")
async def get_chat(chat_id: str) -> ChatHistory:
    chat_history = chat_history_service.get_or_create_chat(chat_id)
    return chat_history


# @router.get("/del_chat")
# async def delete_chat() -> HistoryChat:
#     chat_history_service.create_chat()
#     return "BIDE KREIRANJE"
#     # return chat_history_service.delete_chat("ch01-u01")
