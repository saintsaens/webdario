import * as metadataService from '../services/metadataService.js';

export const getMetadata = async (req, res) => {
    try {
        const metadata = metadataService.getTrackMetadata();
        res.json(metadata);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMetadata = async (req, res) => {
    try {
        const metadata = metadataService.updateTrackMetadata();
        res.json(metadata);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
