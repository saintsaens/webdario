import { PassThrough } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import { getCurrentTrackInfo } from './trackInfo.js';

export const createStreamAt = (tracks, startTime) => {
    const passthrough = new PassThrough();
    const { currentTrack, trackElapsed } = getCurrentTrackInfo(tracks, startTime);
    
    const streamTrack = (track, elapsed) => {
        ffmpeg(track.path)
            .setStartTime(elapsed / 1000)
            .audioCodec('libmp3lame')
            .format('mp3')
            .on('end', () => {
                const next = getCurrentTrackInfo(tracks, Date.now() - track.duration);
                streamTrack(next.currentTrack, 0);
            })
            .pipe(passthrough, { end: false });
    };
    
    streamTrack(currentTrack, trackElapsed);
    return passthrough;
};