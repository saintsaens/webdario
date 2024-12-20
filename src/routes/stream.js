import { TRACKS, getStreamAtCurrentPosition } from '../utils/tracks.js';

let startTime = Date.now();

/**
 * Initialize the server and routes.
 * @param {import('express').Express} app - Express app instance.
 * @param {number} port - Port number for the server.
 */
export const initServer = (app, port) => {
    app.get('/stream', (req, res) => {
        if (TRACKS.length === 0) {
            return res.status(500).send('Tracks not initialized.');
        }
        const stream = getStreamAtCurrentPosition(startTime);
        res.setHeader('Content-Type', 'audio/mpeg');
        stream.pipe(res);
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};