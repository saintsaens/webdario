import fs from 'fs';
import path from 'path';
import { getTrackDuration } from './ffmpegService.js';
import { PLAYLIST_DIR, TRACKS_DIR } from './paths.js';

export const fetchTracks = async () => {
    const files = fs.readdirSync(TRACKS_DIR).filter(file => file !== '.DS_Store');
    const paths = files.map(file => path.join(TRACKS_DIR, file));
    const durations = await Promise.all(paths.map(getTrackDuration));
    const totalDuration = durations.reduce((sum, duration) => sum + duration, 0);
    const tracks = paths.map((path, i) => ({ path, duration: durations[i] }));
    return { tracks, totalDuration };
};

export const createTrackListFile = async (outputFile = 'playlist.txt') => {
    const files = fs.readdirSync(TRACKS_DIR).filter(file => file !== '.DS_Store');
    const paths = files.map(file => path.join(TRACKS_DIR, file));

    // Create content for the playlist.txt in ffmpeg's required format
    const fileListContent = paths.map(trackPath => `file '${trackPath}'`).join('\n');

    // Write the content to the output file
    const filePath = path.join(PLAYLIST_DIR, outputFile);
    fs.writeFileSync(filePath, fileListContent, 'utf8');
};
