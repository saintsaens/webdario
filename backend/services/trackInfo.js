import { fetchTracks } from "./trackLoader.js";

export const getCurrentTrackInfo = async () => {
    const { tracks, totalDuration } = await fetchTracks();

    const startTime = new Date('2024-05-04T13:37:00Z').getTime();
    const now = Date.now();
    const elapsed = (now - startTime) % totalDuration;
    
    let cumulativeDuration = 0;
    for (const track of tracks) {
        cumulativeDuration += track.duration;
        if (elapsed < cumulativeDuration) {
            return {
                currentTrack: track,
                trackElapsed: elapsed - (cumulativeDuration - track.duration)
            };
        }
    }
};
