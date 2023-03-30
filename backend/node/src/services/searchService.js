const axios = require('axios');
const {MOVIE_API_Key} = require('../../constants');

const searchName = async (name, year) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_Key}&query=${name}&year=${year}&include_adult=true`;
    url.replace(' ', '%20');

    return axios.get(url)
        .then((response) => {
            return response.data.results[0];
        }).catch((error) => {
            console.log(error);
        });
};

const searchExactName = async (name) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_Key}&query=${name}&include_adult=true`;
    url.replace(' ', '%20');

    return axios.get(url)
        .then((response) => {
            return response.data.results;
        }).catch((error) => {
            console.log(error);
        });
};

const searchDetails = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API_Key}`;

    return axios.get(url)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

const searchTrending = async () => {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIE_API_Key}`;

    return axios.get(url)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

const searchImages = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${MOVIE_API_Key}`;

    return axios.get(url)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

const searchTitles = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/alternative_titles?api_key=${MOVIE_API_Key}`;

    return axios.get(url)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

const searchCredits = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${MOVIE_API_Key}`;

    return axios.get(url)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

const searchReviews = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${MOVIE_API_Key}`;

    return axios.get(url)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

const searchVideos = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${MOVIE_API_Key}`;

    return axios.get(url)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

module.exports = {
    searchName,
    searchExactName,
    searchDetails,
    searchTrending,
    searchImages,
    searchTitles,
    searchCredits,
    searchReviews,
    searchVideos
}