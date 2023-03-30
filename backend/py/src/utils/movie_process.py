def movie_process(movies: list) -> list:
    """
    Process movies
    :param movies: list of movies
    :return: list of processed movies
    """
    movies = [movie for movie in movies if movie and movie[0].isdigit()]
    movies = [movie[3:].strip() for movie in movies]
    movies = [movie.rsplit("(", 1) for movie in movies]
    movies = [[movie[0].strip(), movie[1][:-1]] for movie in movies]
    movies = [{"name": movie[0], "year": movie[1]} for movie in movies]
    return movies
