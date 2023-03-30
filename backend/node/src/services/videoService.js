const axios = require('axios');
const {GOOGLE_API_KEY} = require('../../constants');

const searchVideos = async (key) => {
    const url = `https://www.googleapis.com/youtube/v3/search?q=${key}&key=${GOOGLE_API_KEY}`;

    return axios.get(url)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
};

module.exports = {
    searchVideos
}