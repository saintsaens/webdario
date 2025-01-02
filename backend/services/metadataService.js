import fs from 'fs/promises';
import path from 'path';

const METADATA_FILE = path.join(process.cwd(), 'data', 'metadata.json');

export const getTrackMetadata = async (trackPath) => {
    try {
        const metadata = JSON.parse(await fs.readFile(METADATA_FILE, 'utf-8'));
        return metadata[trackPath] || {};
    } catch {
        return {};
    }
};

export const updateTrackMetadata = async (trackPath, metadata) => {
    try {
        await fs.mkdir(path.dirname(METADATA_FILE), { recursive: true });
        const existingMetadata = await getTrackMetadata(trackPath);
        const allMetadata = JSON.parse(await fs.readFile(METADATA_FILE, 'utf-8')).catch(() => ({}));
        
        allMetadata[trackPath] = {
            ...existingMetadata,
            ...metadata,
            lastUpdated: new Date().toISOString()
        };

        await fs.writeFile(METADATA_FILE, JSON.stringify(allMetadata, null, 2));
        return allMetadata[trackPath];
    } catch (error) {
        console.error('Error updating metadata:', error);
        throw error;
    }
};
