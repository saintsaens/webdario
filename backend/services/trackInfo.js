export const getCurrentTrackInfo = (tracks, startTime) => {
    const now = Date.now();
    const totalDuration = tracks.reduce((sum, track) => sum + track.duration, 0);
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
