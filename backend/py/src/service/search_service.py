import openai


def generate_search_prompt(number: int, description: str) -> str:
    """
    Generate prompt for search
    :param number: how many movies to return
    :param description: keywords to search for movies
    :return: prompt for search
    """
    return "Recommend {number} movies based on the following description and return only with movie title and year: {description}".format(number=number, description=description)


def search_service(description: str, number: int = 5) -> openai.Completion:
    """
    Search for movies based on description
    :param description: keywords to search for movies
    :param number: how many movies to return
    :return: response from OpenAI
    """
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=generate_search_prompt(number, description),
        temperature=0.5,
        max_tokens=100,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response
