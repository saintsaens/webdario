import fs from 'fs';
import path from 'path';
import { getTrackDuration } from './ffmpegUtils.js';
import { AMBIENT_OST_DIR } from '../config/paths.js';

export const TRACKS = [];

export const fetchTracks = async () => {
    try {
        // Get filtered files first
        const fileNames = fs.readdirSync(AMBIENT_OST_DIR)
            .filter(file => file !== '.DS_Store');

        // Create array of paths
        const filePaths = fileNames.map(file => path.join(AMBIENT_OST_DIR, file));
        
        // Get durations in parallel
        const durations = await Promise.all(
            filePaths.map(path => getTrackDuration(path))
        );
        
        // Create final tracks array
        return fileNames.map((file, index) => ({
            path: filePaths[index],
            duration: durations[index]
        }));
    } catch (error) {
        console.error('Error fetching tracks:', error);
        throw error;
    }
}

/**
 * Get the current track stream based on elapsed time.
 * @param {number} startTime - Timestamp of when the playback started.
 * @returns {import('stream').PassThrough} - Audio stream of the current track.
 */
export const getStreamAtCurrentPosition = (startTime) => {
    const now = Date.now();
    const totalDuration = TRACKS.reduce((sum, track) => sum + track.duration, 0);
    const elapsed = (now - startTime) % totalDuration;

    let cumulativeDuration = 0;
    let currentTrack;

    for (const track of TRACKS) {
        cumulativeDuration += track.duration;
        if (elapsed < cumulativeDuration) {
            currentTrack = track;
            break;
        }
    }

    const trackElapsed = elapsed - (cumulativeDuration - currentTrack.duration);
    const passthrough = new PassThrough();

    ffmpeg(currentTrack.path)
        .setStartTime(trackElapsed / 1000) // Start time in seconds
        .audioCodec('libmp3lame')
        .format('mp3')
        .on('error', (err) => console.error('Error processing track:', err))
        .pipe(passthrough);

    return passthrough;
};