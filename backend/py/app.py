import sys

from handler.search_handler import search_handler
from handler.similar_handler import similar_handler

from flask import Flask, request
from flask_cors import CORS

sys.path.append("./src")

app = Flask(__name__)

CORS(app)


@app.route('/search', methods=['GET'])
def getSearch() -> list:
    """
    Search for movies based on description
    :return: list of movies
    """
    return search_handler(request)


@app.route('/similar', methods=['GET'])
def getSimilar() -> list:
    """
    Search for similar movies
    :return: list of movies
    """
    return similar_handler(request)


if __name__ == '__main__':
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
