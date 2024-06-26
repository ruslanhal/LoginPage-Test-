import os
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", None)
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", None)