import os
from dotenv import load_dotenv
from azure.communication.email import EmailClient
from azure.core.credentials import AzureKeyCredential

load_dotenv()

credential = AzureKeyCredential(os.getenv("EMAIL_CREDENTIAL")) 
endpoint= os.getenv("ENDPOINT")
client = EmailClient(endpoint, credential)

def send_reset_password_mail(address, reset_link):
    message = {
    "content": {
        "subject": "Auth System Reset Password",
        "plainText": f"Password reset code - {reset_link}",
        "html": f"<html><h1>Password reset code - {reset_link}</h1></html>"
    },
    "recipients": {
        "to": [
            {
                "address": address,
                "displayName": "Auth System"
            }
        ]
    },
    "senderAddress": os.getenv("SENDER_ADDRESS")
    }
    poller = EmailClient.begin_send(client, message)
    # result = poller.result()
    # print(result)