from datetime import datetime

from models import IncomingMessage, ChatHistory, ChatHistoryMessage

from services import chat_history_service


def engine_chat(message, chat_history):
    return "I dont know"


# TODO ovoa ke treba i u rl
def translate_chat_history(chat: ChatHistory):
    return [
        msg
        for m in chat.messages
        for msg in (
            m.user,
            m.system,
        )
    ]


def query(message: IncomingMessage):
    chat_history = chat_history_service.get_chat(message.chat_id)

    transformed_chat_history = translate_chat_history(chat_history)
    engine_response = engine_chat(
        message.content, transformed_chat_history
    )  # .response na krajo treba msm

    # TODO posebno za sent_at i respinded_at?
    new_message = ChatHistoryMessage(
        user=message.content, system=engine_response, sent_at=str(datetime.now())
    )
    chat_history_service.append_message(message.chat_id, new_message)

    return engine_response
