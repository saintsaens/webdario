import { PassThrough } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import { getTrackName, getTrackArtist } from "./ffmpegService.js";
import { createTrackListFile } from './trackLoader.js';
import { getCurrentTrackInfo } from './trackInfo.js';
import { PLAYLIST_DIR } from "./paths.js";

let globalPassthrough = null;

const logTrackInfo = async (track) => {
    const trackName = await getTrackName(track.path);
    const trackArtist = await getTrackArtist(track.path);
    console.log(`Now playing: ${trackArtist} - ${trackName}`);
};

const setupFFmpeg = (elapsed) => {
    if (isNaN(elapsed) || elapsed < 0) {
        console.error(`Invalid elapsed time: ${elapsed}`);
        elapsed = 0; // Default to 0 if elapsed is invalid
    }

    return ffmpeg()
        .input(`${PLAYLIST_DIR}/playlist.txt`) // Ensure the playlist file path is correct
        .inputOptions(['-f concat', '-safe 0']) // Proper FFmpeg options
        .setStartTime(elapsed / 1000) // Start from the correct elapsed time
        .audioCodec('libmp3lame')
        .format('mp3')
        .on('error', (err) => {
            console.error('FFmpeg error:', err.message);
        });
};

const streamTrack = async (track, elapsed) => {
    await logTrackInfo(track);

    const ffmpegCommand = setupFFmpeg(elapsed);

    // Ensure the passthrough stream exists and pipe FFmpeg output
    if (!globalPassthrough) {
        console.error('Global passthrough stream is not initialized');
        return;
    }

    ffmpegCommand.pipe(globalPassthrough, { end: false });
};

export const startStream = async () => {
    globalPassthrough = new PassThrough();

    createTrackListFile(); // Ensure playlist.txt is created
    const { currentTrack, trackElapsed } = await getCurrentTrackInfo();

    await streamTrack(currentTrack, trackElapsed);
};

export const getGlobalStream = () => {
    if (!globalPassthrough) {
        throw new Error('Stream not initialized');
    }
    return globalPassthrough;
};
