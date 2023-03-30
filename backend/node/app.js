const express = require('express');
const cors = require('cors');
const search = require('./src/routers/searchRouter');
const video = require('./src/routers/videoRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(search);
app.use(video);

app.listen(3333, () => {
    console.log('Listening on port 3333');
});