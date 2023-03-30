const pyApiPrefix = '/py';

export const searchDescription = (description) => {
    const searchUrl = `${pyApiPrefix}/search?description=${description}`;

    return fetch(searchUrl, {method: 'GET'})
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Error: ${response.status}`);
            }
            return response.json();
        })
};

export const searchSimilar = (name) => {
    const searchUrl = `${pyApiPrefix}/similar?name=${name}`;

    return fetch(searchUrl, {method: 'GET'})
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Error: ${response.status}`);
            }
            return response.json();
        })
};