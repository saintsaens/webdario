import fs from 'fs';
import path from 'path';
import { getTrackDuration } from './ffmpegService.js';
import { AMBIENT_OST_DIR } from './paths.js';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const fetchTracks = async () => {
    const files = fs.readdirSync(AMBIENT_OST_DIR).filter(file => file !== '.DS_Store');
    const paths = files.map(file => path.join(AMBIENT_OST_DIR, file));
    const durations = await Promise.all(paths.map(getTrackDuration));
    return paths.map((path, i) => ({ path, duration: durations[i] }));
};