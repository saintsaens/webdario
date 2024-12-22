import { Router } from 'express';
import { getStreamAtCurrentPosition } from '../src/tracks.js';
import { fetchTracks } from '../src/tracks.js';

export const streamRouter = Router();

const tracks = await fetchTracks();
const startTime = Date.now();

streamRouter.get('/', (req, res) => {
    const stream = getStreamAtCurrentPosition(tracks, startTime);
    res.setHeader('Content-Type', 'audio/mpeg');
    stream.pipe(res);
});