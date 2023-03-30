const express = require('express');
const {searchVideos} = require("../services/videoService");
const router = express.Router();

router.get('/search/video', async (req, res) => {
    const key = req.query.key;
    const data = await searchVideos(key);
    res.json(data);
});

module.exports = router;