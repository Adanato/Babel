import openai
locations = {
    "Africa": ["Kenya", "South Africa", "Morocco"],
    "Asia": ["Japan", "Thailand", "India"],
    "Europe": ["France", "Italy", "Greece"],
    "North America": ["USA", "Canada", "Mexico"],
    "South America": ["Brazil", "Peru", "Argentina"],
    "Oceania": ["Australia", "New Zealand", "Fiji"]
}

def get_trip_idea(country):
    prompt = f"Suggest an interesting travel idea for a trip to {country}."
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7
    )
    trip_idea = response.choices[0].text.strip()
    return trip_idea
