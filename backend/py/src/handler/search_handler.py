import flask

from service.search_service import search_service
from utils.movie_process import movie_process


def search_handler(request: flask.Request) -> list:
    """
    Search for movies based on description
    :param request: request from Flask
    :return: list of movies
    """
    description = request.args.get("description")
    response = search_service(description)
    movies = response.choices[0].text.split("\n")
    movies = movie_process(movies)
    return movies
