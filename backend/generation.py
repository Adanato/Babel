from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def get_location_generation(prompt):
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="gpt-4-turbo",
)

    
    return chat_completion

