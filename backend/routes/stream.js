import { Router } from 'express';
import { fetchTracks, getStreamAtCurrentPosition } from '../services/tracks.js';

export const streamRouter = Router();

const tracks = await fetchTracks();
const startTime = Date.now();

streamRouter.get('/', (req, res) => {
    const stream = getStreamAtCurrentPosition(tracks, startTime);
    res.setHeader('Content-Type', 'audio/mpeg');
    stream.pipe(res);
});