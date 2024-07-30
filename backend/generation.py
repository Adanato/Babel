def get_location_generation(prompt, n=3):
    response = openai.Completion.create(
        engine="gpt-4o",
        prompt=prompt,
        max_tokens=50,
        n=n,
        stop=None,
        temperature=0.7
    )

    suggestions = [choice['text'].strip() for choice in response.choices]
    return suggestions