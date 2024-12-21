import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';

const ffprobe = promisify(ffmpeg.ffprobe);

export async function getTrackDuration(trackPath) {
    try {
        const metadata = await ffprobe(trackPath);
        return metadata.format.duration * 1000; // duration in milliseconds
    } catch (err) {
        throw err;
    }
}

export async function getTrackName(trackPath) {
    try {
        const metadata = await ffprobe(trackPath);
        return metadata.format.tags.title || 'Unknown Title';
    } catch (err) {
        throw err;
    }
}
