from pydantic import BaseModel


class IncomingMessage(BaseModel):
    chat_id: str
    content: str
    # TODO
    sent_at: str | None = None
