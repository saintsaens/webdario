import { PassThrough } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import { createTrackListFile } from './trackLoader.js';
import { generateStartTime } from "../utils/durations.js";
import { initializeStream, getStream } from '../repositories/streamRepository.js';
import { getTrackMetadata } from '../repositories/metadataRepository.js';

let globalPassthrough = null;

const setupFFmpeg = (elapsed) => {
    if (isNaN(elapsed) || elapsed < 0) {
        elapsed = 0;
    }

    const ffmpegCommand = ffmpeg()
        .input(`${PLAYLIST_DIR}/playlist.txt`)
        .inputOptions(['-f concat', '-safe 0'])
        .setStartTime(elapsed / 1000)
        .audioCodec('libmp3lame')
        .format('mp3')
        .on('error', (err) => {
            console.error('FFmpeg error:', err.message);
        });

    return ffmpegCommand;
};

export const startStream = async () => {
    createTrackListFile();
    const startTime = await generateStartTime();
    await initializeStream(startTime);
};

export const getGlobalStream = () => {
    return getStream();
};
