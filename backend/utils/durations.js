import { fetchTracks } from "../services/trackLoader.js";

export const generateStartTime = async () => {
    // const startTime = new Date('2024-05-04T13:37:00Z').getTime();
    const now = Date.now();
    // const { totalDuration } = await fetchTracks();
    // const elapsed = (now - startTime) % totalDuration;

    // return elapsed;
    return now;
};
