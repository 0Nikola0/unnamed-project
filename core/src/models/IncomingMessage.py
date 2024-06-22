from pydantic import BaseModel, Field


class IncomingMessage(BaseModel):
    user_id: int = Field(..., alias="userId")
    chat_id: str = Field(..., alias="chatId")
    content: str
    # TODO
    sent_at: str | None = None
