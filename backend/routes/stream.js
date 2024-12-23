import { Router } from 'express';
import { getGlobalStream } from '../services/streamHandler.js';

export const streamRouter = Router();

streamRouter.get('/', (req, res) => {
    try {
        const stream = getGlobalStream();
        res.setHeader('Content-Type', 'audio/mpeg');
        stream.pipe(res);
    } catch (error) {
        res.status(500).send('Stream not available');
    }
});