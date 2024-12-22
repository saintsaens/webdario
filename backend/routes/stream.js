import { Router } from 'express';
import { fetchTracks } from "../services/trackLoader.js";
import { createStreamAt } from "../services/streamHandler.js";

export const streamRouter = Router();

const tracks = await fetchTracks();
const startTime = new Date('2024-05-04T13:37:00Z').getTime();

streamRouter.get('/', (req, res) => {
    const stream = createStreamAt(tracks, startTime);
    res.setHeader('Content-Type', 'audio/mpeg');
    stream.pipe(res);
});