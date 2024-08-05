from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Hardcoded destination data
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
    return jsonify(destinations)

@app.route('/api/generate', methods=['POST'])
def add_destination():
    new_destination = request.json

    return jsonify(new_destination), 201

@app.route('/api/suggestions', methods=['GET'])
def get_destinations():
    return jsonify(destinations)

app.route("/home", methods=["GET"])
def home():
    return render_template("home.html", subtitle="Home", text="Welcome to the home page!")

if __name__ == '__main__':
    app.run(debug=True)