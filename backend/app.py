from flask import Flask, jsonify, request
import openai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

#Custom code imports
from generation import get_location_generation
app = Flask(__name__)



@app.route('/api/generate', methods=['GET'])
def get_destinations():
    # Get the 'destination' and 'days' parameters from the URL
    destination = request.args.get('destination', default='a beach', type=str)
    days = request.args.get('days', default=7, type=int)
    
    # Define the prompt for the OpenAI API
    prompt = f"Suggest three activities for a {days}-day vacation in {destination}."
    
    # Get the location suggestions
    destinations = get_location_generation(prompt)
    
    # Return the suggestions as a JSON response
    return jsonify(destinations)


if __name__ == '__main__':
    app.run(debug=True)