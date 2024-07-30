from flask import Flask, jsonify, request
import openai
from dotenv import load_dotenv
import os
import random

# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

#Custom code imports
from suggestions import get_trip_idea, locations
from generation import get_location_generation
app = Flask(__name__)

destinations = [
    {
        "name": "Paris",
        "country": "France",
        "attractions": ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
        "recommended_days": 4
    },
    {
        "name": "Tokyo",
        "country": "Japan",
        "attractions": ["Tokyo Skytree", "Senso-ji Temple", "Shibuya Crossing"],
        "recommended_days": 5
    },
    {
        "name": "New York City",
        "country": "United States",
        "attractions": ["Statue of Liberty", "Central Park", "Times Square"],
        "recommended_days": 5
    }
]

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

@app.route('/api/generate', methods=['POST'])
def add_destination():
    new_destination = request.json

    return jsonify(new_destination), 201

@app.route('/api/suggestions', methods=['GET'])
def get_destinations():
    # Randomly select a continent
    continent = random.choice(list(locations.keys()))
    # Randomly select a country from the selected continent
    country = random.choice(locations[continent])
    
    # Get a trip idea for the selected country
    trip_idea = get_trip_idea(country)
    
    # Prepare the suggestion response
    suggestion = {
        "continent": continent,
        "country": country,
        "trip_idea": trip_idea
    }

    return jsonify(suggestion)

if __name__ == '__main__':
    app.run(debug=True)