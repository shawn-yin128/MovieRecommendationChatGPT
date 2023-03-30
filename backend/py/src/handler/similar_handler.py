import flask

from service.similar_service import similar_service
from utils.movie_process import movie_process


def similar_handler(request: flask.Request) -> list:
    """
    Search for movies based on description
    :param request: request from Flask
    :return: list of movies
    """
    print(request)
    name = request.args.get("name")
    response = similar_service(name)
    movies = response.choices[0].text.split("\n")
    movies = movie_process(movies)
    return movies
