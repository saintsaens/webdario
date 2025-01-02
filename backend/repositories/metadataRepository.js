import { getTrackName, getTrackArtist } from "../services/ffmpegService.js";

export const getTrackMetadata = async (trackPath) => {
    try {
        const name = await getTrackName(trackPath);
        const artist = await getTrackArtist(trackPath);
        
        return {
            name,
            artist,
            path: trackPath
        };
    } catch (error) {
        console.error('Error fetching track metadata:', error);
        throw error;
    }
};
