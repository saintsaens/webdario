import express from 'express';
import { fetchTracks, getStreamAtCurrentPosition } from "./src/tracks.js";

const app = express();
const port = 3001;

const tracks = await fetchTracks();

const startTime = Date.now();

app.get('/', (req, res) => {
        const stream = getStreamAtCurrentPosition(tracks, startTime);
        res.setHeader('Content-Type', 'audio/mpeg');
        stream.pipe(res);
    });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
