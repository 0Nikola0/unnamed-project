from enum import Enum
from pydantic import BaseModel


class ChatHistoryMessage(BaseModel):
    role: str
    content: str
    sent_at: str
