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

        // Create and shuffle array of paths
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        // Create array of paths
        const filePaths = shuffleArray(fileNames.map(file => path.join(AMBIENT_OST_DIR, file)));

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

const getCurrentTrackInfo = (tracks, startTime) => {
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
    return { currentTrack, trackElapsed };
};

const createTrackStream = (tracks, track, startTime, passthrough) => {
    if (!track || !track.path) {
        console.error('Invalid track:', track);
        return;
    }

    console.log('Creating stream for track:', track.path);

    ffmpeg(track.path)
        .setStartTime(startTime / 1000)
        .audioCodec('libmp3lame')
        .format('mp3')
        .on('error', (err) => {
            console.error('Error processing track:', err);
            // Try next track on error
            const nextTrackInfo = getCurrentTrackInfo(tracks, Date.now());
            createTrackStream(tracks, nextTrackInfo.currentTrack, 0, passthrough);
        })
        .on('end', () => {
            const nextTrackInfo = getCurrentTrackInfo(tracks, Date.now());
            createTrackStream(tracks, nextTrackInfo.currentTrack, 0, passthrough);
        })
        .pipe(passthrough, { end: false });
};

export const getStreamAtCurrentPosition = (tracks, startTime) => {
    if (!tracks || !tracks.length) {
        throw new Error('No tracks available');
    }

    const passthrough = new PassThrough();
    const { currentTrack, trackElapsed } = getCurrentTrackInfo(tracks, startTime);

    if (!currentTrack) {
        throw new Error('Could not determine current track');
    }

    createTrackStream(tracks, currentTrack, trackElapsed, passthrough);
    return passthrough;
};
