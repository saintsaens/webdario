import { PassThrough } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import { getCurrentTrackInfo } from './trackInfo.js';
import { getTrackName } from "./ffmpegService.js";
import { fetchTracks } from './trackLoader.js';

let globalPassthrough = null;
let tracks = null;
let startTime = null;

export const startStream = async () => {
    tracks = await fetchTracks();
    startTime = new Date().getTime();
    globalPassthrough = new PassThrough();
    
    const streamTrack = async (track, elapsed) => {
        const trackName = await getTrackName(track.path);
        console.log(`Now playing: ${trackName}`);
        
        ffmpeg(track.path)
            .setStartTime(elapsed / 1000)
            .audioCodec('libmp3lame')
            .format('mp3')
            .on('end', () => {
                const next = getCurrentTrackInfo(tracks, startTime);
                streamTrack(next.currentTrack, 0);
            })
            .pipe(globalPassthrough, { end: false });
    };
    
    const { currentTrack, trackElapsed } = getCurrentTrackInfo(tracks, startTime);
    await streamTrack(currentTrack, trackElapsed);
};

export const getGlobalStream = () => {
    if (!globalPassthrough) {
        throw new Error('Stream not initialized');
    }
    return globalPassthrough;
};