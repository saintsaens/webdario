import { PassThrough } from "stream";
import { generateStartTime } from "../utils/durations.js";
import * as ffmpegService from './ffmpegService.js';
import * as trackListService from './trackListService.js';

let lofiPassthrough = null;
let coudrierPassthrough = null;

const startLofiStream = async (startTime) => {
    const playlist = await trackListService.createTrackListFile("lofi");
    lofiPassthrough = new PassThrough();
    const ffmpegCommand = ffmpegService.setupFFmpeg(startTime, playlist);
    ffmpegCommand.pipe(lofiPassthrough, { end: false });
};

const startCoudrierStream = async (startTime) => {
    const playlist = await trackListService.createTrackListFile("coudrier");
    coudrierPassthrough = new PassThrough();
    const ffmpegCommand = ffmpegService.setupFFmpeg(startTime, playlist);
    ffmpegCommand.pipe(coudrierPassthrough, { end: false });
};

export const startStreams = async () => {
    const startTime = await generateStartTime();
    await startLofiStream(startTime);
    await startCoudrierStream(startTime);
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
