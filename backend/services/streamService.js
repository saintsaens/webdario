import { PassThrough } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import { createTrackListFile } from './trackLoader.js';
import { generateStartTime } from "../utils/durations.js";
import * as streamRepository from '../repositories/streamRepository.js';

export const startStream = async () => {
    createTrackListFile();
    const startTime = await generateStartTime();
    await streamRepository.initializeStream(startTime);
};

export const getCoudrierStream = () => {
    return streamRepository.getStream();
};

export const getLofiStream = () => {
    return streamRepository.getStream();
};
