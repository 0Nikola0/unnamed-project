from fastapi import APIRouter

from models import IncomingMessage
# from services import engine_service
from services import chat_history_service


router = APIRouter(
    prefix="/engine",
    tags=["engine"],
    responses={404: {"description": "Not found"}},
)


@router.post("/query")
async def query(message: IncomingMessage) -> str:
    # chat_history = chat_history_service.get_or_create_chat(
    #     message.chat_id,
    #     message.user_id,
    # )
    # return engine_service.query(message, chat_history)
    return "halo wer bist du"
