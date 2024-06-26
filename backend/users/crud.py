from pymongo.collection import Collection
from schemas.users import User

def get_user_by_email(collection: Collection, email: str) -> User:
    user_data = collection.find_one({"email": email})
    return User(**user_data) if user_data else None

def create_user(collection: Collection, user: User):
    collection.insert_one(user.dict())