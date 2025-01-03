import * as streamService from '../services/streamService.js';

export const getLofiStream = (req, res) => {
    try {
        const stream = streamService.getLofiStream();
        res.setHeader('Content-Type', 'audio/mpeg');
        stream.pipe(res);
    } catch (error) {
        res.status(500).send('Lofi stream not available');
    }
};

export const getCoudrierStream = (req, res) => {
    try {
        const stream = streamService.getCoudrierStream();
        res.setHeader('Content-Type', 'audio/mpeg');
        stream.pipe(res);
    } catch (error) {
        res.status(500).send('Coudrier stream not available');
    }
};
