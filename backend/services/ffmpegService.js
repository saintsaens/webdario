import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';

const ffprobe = promisify(ffmpeg.ffprobe);

export const getTrackDuration = async (trackPath) => {
    try {
        const metadata = await ffprobe(trackPath);
        return metadata.format.duration * 1000; // duration in milliseconds
    } catch (err) {
        throw err;
    }
}

export const getTrackName = async (trackPath) => {
    try {
        const metadata = await ffprobe(trackPath);
        return metadata.format.tags.title || 'Unknown Title';
    } catch (err) {
        throw err;
    }
}
