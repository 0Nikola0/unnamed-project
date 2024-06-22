from fastapi import APIRouter

from models import ChatHistory
from services import chat_history_service


router = APIRouter(
    prefix="/chats",
    tags=["chats"],
    responses={404: {"description": "Not found"}},
)


@router.get("/get")
async def get_chat(chat_id: str, user_id: int) -> ChatHistory:
    chat_history = chat_history_service.get_or_create_chat(chat_id, user_id)
    return chat_history


@router.get("/get_all")
async def get_all_user_chats(user_id: int) -> list[ChatHistory | None]:
    chat_history = chat_history_service.get_user_chats(user_id)
    return chat_history


@router.get("/delete")
async def delete_chat(chat_id: str, user_id: int):
    chat_history_service.delete_chat(chat_id, user_id)
    return "BIDE delete"
