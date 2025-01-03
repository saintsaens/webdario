import { PassThrough } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import { PLAYLIST_DIR } from "../services/paths.js";

let globalPassthrough = null;

const setupFFmpeg = (elapsed) => {
    if (isNaN(elapsed) || elapsed < 0) {
        elapsed = 0;
    }

    const ffmpegCommand = ffmpeg()
        .input(`${PLAYLIST_DIR}/playlist.txt`)
        .inputOptions(['-f concat', '-safe 0', '-stream_loop -1'])
        .setStartTime(elapsed / 1000)
        .audioCodec('libmp3lame')
        .format('mp3')
        .on('error', (err) => {
            console.error('FFmpeg error:', err.message);
        });

        return ffmpegCommand;
};

export const initializeStream = async (elapsed) => {
    globalPassthrough = new PassThrough();
    const ffmpegCommand = setupFFmpeg(elapsed);
    ffmpegCommand.pipe(globalPassthrough, { end: false });
};

export const getStream = () => {
    if (!globalPassthrough) {
        throw new Error('Stream not initialized');
    }
    return globalPassthrough;
};
