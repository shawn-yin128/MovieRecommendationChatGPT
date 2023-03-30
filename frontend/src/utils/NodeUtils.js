const nodeApiPrefix = '/node';

export const imagePrefix = 'https://image.tmdb.org/t/p/w500';

export const searchName = (list) => {
    const searchUrl = `${nodeApiPrefix}/search/name`;
    const items = {
        items: list
    };

    return fetch(searchUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
    }).then((response) => {
        if (response.status !== 200) {
            console.log(`Error: ${response.status}`);
        }
        return response.json();
    });
};

export const searchExactName = (name) => {
    const searchUrl = `${nodeApiPrefix}/search/exact/name?name=${name}`;

    return fetch(searchUrl, {method: 'GET'})
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Error: ${response.status}`);
            }
            return response.json();
        });
};

export const searchTrending = () => {
    const trendingUrl = `${nodeApiPrefix}/search/trending`;

    return fetch(trendingUrl, {method: 'GET'})
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Error: ${response.status}`);
            }
            return response.json();
        });
};

export const searchDetails = (id) => {
    const detailsUrl = `${nodeApiPrefix}/search/details?id=${id}`;

    return fetch(detailsUrl, {method: 'GET'})
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Error: ${response.status}`);
            }
            return response.json();
        });
};

export const searchVideos = (key) => {
    const videoUrl = `${nodeApiPrefix}/search/videos?key=${key}`;

    return fetch(videoUrl, {method: 'GET'})
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Error: ${response.status}`);
            }
            return response.json();
        });
};
