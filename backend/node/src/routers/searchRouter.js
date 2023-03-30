const express = require('express');
const {searchName, searchDetails, searchTrending, searchImages, searchExactName, searchTitles, searchCredits,
    searchReviews, searchVideos
} = require("../services/searchService");
const router = express.Router();

router.post('/search/name', async (req, res) => {
    const items = req.body.items;
    const results = [];
    for (const item of items) {
        const data = await searchName(item.name, item.year);
        results.push(data);
    }
    console.log(results);
    res.json(results);
});

router.get('/search/exact/name', async (req, res) => {
    const name = req.query.name;
    const data = await searchExactName(name);
    res.json(data);
});

router.get('/search/details', async (req, res) => {
    const id = req.query.id;
    const details = await searchDetails(id);
    const images = await searchImages(id);
    const titles = await searchTitles(id);
    const credits = await searchCredits(id);
    const reviews = await searchReviews(id);
    const videos = await searchVideos(id);
    const data = {
        details,
        images,
        titles,
        credits,
        reviews,
        videos
    }
    res.json(data);
});

router.get('/search/trending', async (req, res) => {
    const data = await searchTrending();
    res.json(data);
});

module.exports = router;