import { PassThrough } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import { getTrackName, getTrackArtist } from "./ffmpegService.js";
import { createTrackListFile } from './trackLoader.js';
import { getCurrentTrackInfo } from './trackInfo.js';

let globalPassthrough = null;

const logTrackInfo = async (track) => {
    const trackName = await getTrackName(track.path);
    const trackArtist = await getTrackArtist(track.path);
    console.log(`Now playing: ${trackArtist} - ${trackName}`);
};

const setupFFmpeg = (track, elapsed) => {
    return ffmpeg(track.path)
        .setStartTime(elapsed / 1000)
        .audioCodec('libmp3lame')
        .format('mp3')
        .on('error', (err) => {
            console.error('FFmpeg error:', err);
        });
};

const streamTrack = async (track, elapsed) => {
    await logTrackInfo(track);
    const ffmpegCommand = setupFFmpeg(track, elapsed);
    ffmpegCommand.pipe(globalPassthrough, { end: false });
};

export const startStream = async () => {
    globalPassthrough = new PassThrough();

    createTrackListFile();
    const { currentTrack, trackElapsed } = await getCurrentTrackInfo();
    await streamTrack(currentTrack, trackElapsed);
};

export const getGlobalStream = () => {
    if (!globalPassthrough) {
        throw new Error('Stream not initialized');
    }
    return globalPassthrough;
};