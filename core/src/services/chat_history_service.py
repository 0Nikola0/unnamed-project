from pymongo.mongo_client import MongoClient

import settings
from models import ChatHistory, ChatHistoryMessage


_client = MongoClient(settings.MONGO_URL)

try:
    _client.admin.command("ping")
except Exception:
    raise "MongoDB client can't be instanced"


_messages_collection = _client["vnp"]["messages"]


def get_chat(chat_id: str, user_id: int) -> ChatHistory:
    """
    Returns the chat with the given id

    Parameters:
        - chat_id: The id of the chat in the database

    Returns:
        - ChatHistory instance of the chat
    """
    chat = _messages_collection.find_one(
        {
            "_id": chat_id,
            "user_id": user_id,
            "$or": [{"is_deleted": False}, {"is_deleted": {"$exists": False}}],
        }
    )

    if chat:
        return ChatHistory(**chat)

    return None


def create_chat(chat_id: str, user_id: int) -> ChatHistory:
    """
    Creates a chat with the given id and user id and returns it

    Parameters:
        - chat_id: The id of the chat to be created
        - user_id: The id of the user the chat belongs to

    Returns:
        - ChatHistory instance of the chat
    """
    _messages_collection.insert_one(
        {"_id": chat_id, "user_id": user_id, "messages": []}
    )
    return get_chat(chat_id, user_id)


def get_or_create_chat(chat_id: str, user_id: int) -> ChatHistory:
    """
    Given a chat_id, if the chat exists in the databasse it returns it,
    else it creates a new chat with the given chat id and user_id and returns it

    Parameters:
        - chat_id: The id of the chat to be returned

    Returns:
        - ChatHistory instance of the chat
    """
    return c if (c := get_chat(chat_id, user_id)) else create_chat(chat_id, user_id)


def get_user_chats(user_id: int) -> list[ChatHistory | None]:
    """
    Given user id, it returns all the chats that user has had

    Parameters:
        - user_id: id of the user

    Returns:
        - list of the chats the user has had or
        empty list if no chats has been made from the user
    """
    res = list(
        _messages_collection.find(
            {
                "user_id": user_id,
                "$or": [{"is_deleted": False}, {"is_deleted": {"$exists": False}}],
            }
        )
    )
    return res


def delete_chat(chat_id: str, user_id: int, soft_delete=True) -> None:
    """
    Deletes a chat with the given id

    Parameters:
        - chat_id: id of the chat to be deleted

    Returns:
        - None

    Exceptions:
        - Raises an exception if it fails,
        eg. a chat with the given id is not in the database
    """
    if soft_delete:
        result = _messages_collection.update_one({"_id": chat_id, "user_id": user_id}, {"$set": {"is_deleted": True}})
        
        if result.modified_count <= 0:
            raise f"The chat with id {chat_id} was not deleted"

    else:
        result = _messages_collection.delete_one({"_id": chat_id, "user_id": user_id})
        
        if result.deleted_count <= 0:
            raise f"The chat with id {chat_id} was not deleted"


def append_message(chat_id: str, message: ChatHistoryMessage) -> None:
    """
    Adds message to a chat

    Parameters:
        - chat_id: id of the chat the message is to be added to
        - message: the message that is to be added to the chat

    Returns:
        - None

    Exceptions:
        - Raises an exception if it fails,
        eg. a chat with the given id is not in the database
    """

    result = _messages_collection.update_one(
        {"_id": chat_id},
        {"$push": {"messages": message.model_dump()}},
    )

    if result.modified_count <= 0:
        raise f"The message was not appended to the chat with id {chat_id}"
