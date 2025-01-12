import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';

let currentTrackIndex = 0;

export const setupFFmpeg = (playlist) => {
    const passthrough = new PassThrough();

    const playTrack = (index) => {
        if (index >= playlist.length) {
            index = 0;
        }

        const command = ffmpeg()
            .input(playlist[index])
            .audioCodec('libmp3lame')
            .format('mp3')
            .on('end', () => {
                playTrack(index + 1);
            })
            .on('error', (err) => {
                console.error('FFmpeg error:', err.message);
                playTrack(index + 1);
            });

        command.pipe(passthrough, { end: false });
    };

    playTrack(currentTrackIndex);

    return passthrough;
};
