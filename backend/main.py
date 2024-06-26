import os
import random
from fastapi.responses import JSONResponse
import uvicorn
import logging
from openai import OpenAI
from dotenv import load_dotenv
from datetime import datetime
from db.db_config import setup_db, db
from pymongo.errors import PyMongoError
from contextlib import asynccontextmanager
from auth.jwt_config import create_access_token
from fastapi.middleware.cors import CORSMiddleware
from auth.send_mail import send_reset_password_mail
from starlette.middleware.sessions import SessionMiddleware
from fastapi import FastAPI, HTTPException, APIRouter
from schemas.users import User, LoginForm, PasswordResetRequest, PasswordResetForm
from users.users import (
    get_password_hash,
    authenticate_user,
    create_password_reset_token,
)

from auth.oAuth.oAuth_config import CLIENT_SECRET, CLIENT_ID
from authlib.integrations.starlette_client import OAuth, OAuthError
from starlette.requests import Request


load_dotenv()

app = FastAPI()
router = APIRouter()
oauth = OAuth()

oauth.register(
    name="google",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    client_kwargs={
        "scope": "email openid profile",
        "redirect_url": "http://127.0.0.1:8000/auth",
    },
)

host = os.getenv("HOST")
port = int(os.getenv("PORT"))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

random_prompts = [
    "Generate a random inspirational quote.",
    "Give me a surprising fact.",
    "Tell me something interesting.",
    "What's a fun fact I might not know?",
]

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
app.add_middleware(SessionMiddleware, secret_key=os.getenv("SESSION_SECRET_KEY"))


@asynccontextmanager
async def lifespan(app: FastAPI):
    await setup_db()
    yield


@app.post("/sign-up", tags=["User Auth"])
async def sign_up(user: User):
    try:
        existing_user = await db["users"].find_one({"email": user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        hashed_password = get_password_hash(user.password)
        user_data = user.model_dump()
        user_data["password"] = hashed_password
        await db["users"].insert_one(user_data)
        prompt = random.choice(random_prompts)
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            max_tokens=int(os.getenv("CHAT_GPT_MAX_TOKENS")),
            temperature=int(os.getenv("CHAT_GPT_MAX_TEMPERATURE")),
        )
        random_text = response.choices[0].text.strip()
        return {"msg": "User registered successfully.", "toast": random_text}
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail="Database error: " + str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail="An unexpected error occurred: " + str(e)
        )


@app.post("/login", tags=["User Auth"])
async def login(form_data: LoginForm):
    user = await authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user["email"]})
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@app.post("/reset-password", tags=["Reset Password"])
async def reset_password_request(form_data: PasswordResetRequest):
    try:
        user = await db["users"].find_one({"email": form_data.email})
        if not user:
            raise HTTPException(status_code=400, detail="Email not registered")
        reset_token, reset_token_expiry = await create_password_reset_token()
        await db["password_resets"].insert_one(
            {
                "email": form_data.email,
                "reset_token": reset_token,
                "expiry": reset_token_expiry,
            }
        )
        # reset_link = f"{os.getenv('FRONTEND_URL')}/reset-password?token={reset_token}"
        reset_link = f"Reset code = {reset_token}"
        # logger.info(f"Send this link to the user via email: {reset_link}")
        try:
            send_reset_password_mail(form_data.email, reset_link=reset_link)
        except Exception as e:
            print(f"An error occurred while sending reset password email: {str(e)}")
        return {"msg": "Password reset email sent"}
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail="Database error: " + str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail="An unexpected error occurred: " + str(e)
        )


@app.post("/reset-password/confirm", tags=["Reset Password"])
async def reset_password_confirm(form_data: PasswordResetForm):
    try:
        reset_entry = await db["password_resets"].find_one(
            {"reset_token": form_data.token}
        )
        if not reset_entry:
            raise HTTPException(status_code=400, detail="Invalid or expired token")
        if reset_entry["expiry"] < datetime.utcnow():
            raise HTTPException(status_code=400, detail="Token has expired")
        hashed_password = get_password_hash(form_data.new_password)
        await db["users"].update_one(
            {"email": reset_entry["email"]}, {"$set": {"password": hashed_password}}
        )
        await db["password_resets"].delete_one({"reset_token": form_data.token})
        return {"msg": "Password has been reset successfully"}
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail="Database error: " + str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail="An unexpected error occurred: " + str(e)
        )


@app.get("/auth-login")
async def login(request: Request):
    url = request.url_for("auth")
    return await oauth.google.authorize_redirect(request, url)

@app.get("/")
async def welcome():
    return 'Welcome'

@app.route("/auth", methods=["GET"])
async def auth(request: Request):
    if "code" not in request.query_params:
        redirect_uri = request.url_for("auth")
        return await oauth.google.authorize_redirect(request, redirect_uri)
    else:
        try:
            token = await oauth.google.authorize_access_token(request)
            user = token.get("userinfo")
            if user:
                request.session["user"] = dict(user)
                access_token = create_access_token(data={"sub": user["email"]})
                await db["users"].insert_one({"email": user["email"]})
                return JSONResponse(
                    {
                        "email": user["email"],
                        "access_token": access_token,
                        "token_type": "bearer",
                    }
                )
            else:
                return JSONResponse(
                    {"error": "User information not available"}, status_code=400
                )
        except OAuthError as e:
            print(e)
            return JSONResponse({"error": "OAuth authorization error"}, status_code=400)


# if __name__ == "__main__":
#     uvicorn.run(app, host=host, port=port)
