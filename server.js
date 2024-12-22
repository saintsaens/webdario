import express from 'express';
import { fetchTracks, getStreamAtCurrentPosition } from "./src/tracks.js";
import corsLoader from "./loaders/corsLoader.js";
import morganLoader from "./loaders/morganLoader.js";

const app = express();
const port = 3001;

const tracks = await fetchTracks();
morganLoader(app);
corsLoader(app);

const startTime = Date.now();

app.get('/', (req, res) => {
        const stream = getStreamAtCurrentPosition(tracks, startTime);
        res.setHeader('Content-Type', 'audio/mpeg');
        stream.pipe(res);
    });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
