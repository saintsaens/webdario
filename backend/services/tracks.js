import fs from 'fs';
import path from 'path';
import { getTrackDuration } from './ffmpegService.js';
import { AMBIENT_OST_DIR } from './paths.js';
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';

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

export const getStreamAtCurrentPosition = (tracks, startTime) => {
    const now = Date.now();
    const totalDuration = tracks.reduce((sum, track) => sum + track.duration, 0);
    const elapsed = (now - startTime) % totalDuration;

    let cumulativeDuration = 0;
    let currentTrack;

    for (const track of tracks) {
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