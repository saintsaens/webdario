import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';

const ffprobe = promisify(ffmpeg.ffprobe);

export async function getTrackDuration(trackPath) {
    if (!trackPath) {
        throw new Error('No input specified');
    }
    
    try {
        const metadata = await ffprobe(trackPath);
        return metadata.format.duration * 1000; // duration in milliseconds
    } catch (err) {
        throw err;
    }
}
