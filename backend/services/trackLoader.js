import { getTrackDuration } from './ffprobeService.js';
import { getTracks } from '../repositories/trackRepository.js';

export const fetchTracks = async (channel = 'lofi') => {
    const paths = await getTracks(channel);
    const durations = await Promise.all(paths.map(getTrackDuration));
    const totalDuration = durations.reduce((sum, duration) => sum + duration, 0);
    const tracks = paths.map((path, i) => ({ path, duration: durations[i] }));
    return { tracks, totalDuration };
};
