from pydantic import BaseModel, EmailStr

class LoginForm(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    email: EmailStr
    password: str

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetForm(BaseModel):
    token: str
    new_password: str