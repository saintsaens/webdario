import * as radioService from '../services/radioService.js';

export const getLofiStream = (req, res) => {
    try {
        const channel = process.env.LOFI_CHANNEL_NAME;

        const streamPath = radioService.getChannel(channel);

        res.setHeader('Content-Type', 'application/dash+xml');

        streamPath.pipe(res);
        streamPath.on('error', (err) => {
            console.error('Error streaming file:', err.message);
            res.status(500).send('Error streaming lofi file');
        });
    } catch (error) {
        console.error('Error retrieving lofi stream:', error.message);
        res.status(500).send('Lofi stream not available');
    }
};

export const getCoudrierStream = (req, res) => {
    try {
        const channel = process.env.COUDRIER_CHANNEL_NAME;

        const streamPath = radioService.getChannel(channel);

        res.setHeader('Content-Type', 'application/dash+xml');

        streamPath.pipe(res);
        streamPath.on('error', (err) => {
            console.error('Error streaming file:', err.message);
            res.status(500).send('Error streaming coudrier file');
        });
    } catch (error) {
        console.error('Error retrieving coudrier stream:', error.message);
        res.status(500).send('Coudrier stream not available');
    }
};
