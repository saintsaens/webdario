import { PassThrough } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import { PLAYLIST_DIR } from "./paths.js";

let globalPassthrough = null;

export const setupFFmpeg = (startTime, playlist) => {
    if (isNaN(startTime) || startTime < 0) {
        startTime = 0;
    }

    const command = ffmpeg()
        .input(`${PLAYLIST_DIR}/${playlist}`)
        .inputOptions(['-f concat', '-safe 0', '-stream_loop -1'])
        .setStartTime(startTime / 1000)
        .audioCodec('libmp3lame')
        .format('mp3')
        .on('error', (err) => {
            console.error('FFmpeg error:', err.message);
        });

        return command;
};
