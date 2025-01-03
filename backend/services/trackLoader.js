import fs from 'fs';
import path from 'path';
import { getTrackDuration } from './ffprobeService.js';
import { LOFI_TRACKS_DIR } from './paths.js';

export const fetchTracks = async () => {
    const files = fs.readdirSync(LOFI_TRACKS_DIR).filter(file => file !== '.DS_Store');
    const paths = files.map(file => path.join(LOFI_TRACKS_DIR, file));
    const durations = await Promise.all(paths.map(getTrackDuration));
    const totalDuration = durations.reduce((sum, duration) => sum + duration, 0);
    const tracks = paths.map((path, i) => ({ path, duration: durations[i] }));
    return { tracks, totalDuration };
};
