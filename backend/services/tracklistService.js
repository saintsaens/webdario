import dotenv from 'dotenv';
import { getTracks, getTrackUrl } from "../repositories/trackRepository.js";

dotenv.config();

export const getTracklist = async (channel) => {
    const tracks = await getTracks(channel);
    const trackUrls = await Promise.all(
        tracks.map(track => getTrackUrl(channel, track))
    );
    return trackUrls;
};
