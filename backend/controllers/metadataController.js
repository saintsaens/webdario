import { getTrackMetadata, updateTrackMetadata } from '../services/metadataService.js';

export const getMetadata = async (req, res) => {
    try {
        const trackPath = decodeURIComponent(req.params.trackPath);
        const metadata = await getTrackMetadata(trackPath);
        res.json(metadata);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMetadata = async (req, res) => {
    try {
        const trackPath = decodeURIComponent(req.params.trackPath);
        const metadata = await updateTrackMetadata(trackPath, req.body);
        res.json(metadata);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
