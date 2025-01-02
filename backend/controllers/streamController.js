import { getGlobalStream } from '../services/streamService.js';

export const handleStreamRequest = (req, res) => {
    try {
        const stream = getGlobalStream();
        res.setHeader('Content-Type', 'audio/mpeg');
        stream.pipe(res);
    } catch (error) {
        res.status(500).send('Stream not available');
    }
};
