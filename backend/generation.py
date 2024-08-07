from dotenv import load_dotenv
import json
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


def get_accommodation(destination, days):
    prompt = f"Provide accommodation details for a {days}-day vacation in {destination} in JSON format. The response should include 'name', 'address', and 'description'."
    response = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="gpt-4-turbo",
)
    return json.loads(response['choices'][0]['message']['content'])

def get_activities(destination, days):
    prompt = f"Provide a list of activities for a {days}-day vacation in {destination} in JSON format. Each day should have two activities with 'title' and 'description'."
    response = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="gpt-4-turbo",
)
    return json.loads(response['choices'][0]['message']['content'])

def get_dining_options(destination, days):
    prompt = f"Provide a list of dining options for a {days}-day vacation in {destination} in JSON format. Each day should have two dining option with 'name' and 'description'."
    response = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="gpt-4-turbo",
)
    return json.loads(response['choices'][0]['message']['content'])
