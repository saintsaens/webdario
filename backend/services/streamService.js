import { PassThrough } from 'stream';
import * as ffmpegService from './ffmpegService.js';
import * as playlistService from './playlistService.js';

let lofiPassthrough = null;
let coudrierPassthrough = null;

const startLofiStream = async () => {
    const playlist = await playlistService.createPlaylist("lofi");
    lofiPassthrough = ffmpegService.setupFFmpeg(playlist);
};

const startCoudrierStream = async () => {
    const playlist = await playlistService.createPlaylist("coudrier");
    coudrierPassthrough = ffmpegService.setupFFmpeg(playlist);
};

export const startStreams = async () => {
    await startCoudrierStream();
    await startLofiStream();
};

export const getCoudrierStream = () => {
    if (!coudrierPassthrough) {
        throw new Error('Coudrier stream not initialized');
    }
    return coudrierPassthrough;
};

export const getLofiStream = () => {
    if (!lofiPassthrough) {
        throw new Error('Lofi stream not initialized');
    }
    return lofiPassthrough;
};
