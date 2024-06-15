from pydantic import BaseModel

from models import ChatHistoryMessage


class ChatHistory(BaseModel):
    _id: str
    created_at: str | None = None
    messages: list[ChatHistoryMessage] | None = None
