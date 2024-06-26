import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

mongo_uri = os.getenv("MONGODB_URL")
client = AsyncIOMotorClient(mongo_uri)
db = client[os.getenv("MONGODB_NAME")]

async def setup_db():
    if "users" not in await db.list_collection_names():
        await db.create_collection("users")