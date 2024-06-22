from pydantic import BaseModel, Field

from models import ChatHistoryMessage


class ChatHistory(BaseModel):
    id: str = Field(..., alias="_id")
    # created_at: str | None = None
    messages: list[ChatHistoryMessage] | None = None
