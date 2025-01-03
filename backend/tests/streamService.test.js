import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PassThrough } from 'stream';
import * as ffmpegService from '../services/ffmpegService.js';
import * as trackListService from '../services/trackListService.js';
import { startStreams, getLofiStream, getCoudrierStream } from '../services/streamService.js';
import * as durations from '../utils/durations.js';

// Mock dependencies
vi.mock('stream', () => ({
    PassThrough: vi.fn()
}));

vi.mock('../services/ffmpegService.js', () => ({
    setupFFmpeg: vi.fn()
}));

vi.mock('../services/trackListService.js', () => ({
    createTrackListFile: vi.fn()
}));

vi.mock('../utils/durations.js', () => ({
    generateStartTime: vi.fn()
}));

describe('streamService', () => {
    const mockPassThrough = {
        pipe: vi.fn()
    };

    const mockFFmpegCommand = {
        pipe: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
        PassThrough.mockImplementation(() => mockPassThrough);
        ffmpegService.setupFFmpeg.mockReturnValue(mockFFmpegCommand);
        trackListService.createTrackListFile.mockResolvedValue('playlist.txt');
        durations.generateStartTime.mockResolvedValue('00:00:00');
        mockFFmpegCommand.pipe.mockReturnValue(mockFFmpegCommand);
    });

    describe('startStreams', () => {
        it('should initialize both streams correctly', async () => {
            await startStreams();

            expect(PassThrough).toHaveBeenCalledTimes(2);
            expect(trackListService.createTrackListFile).toHaveBeenCalledWith('lofi');
            expect(trackListService.createTrackListFile).toHaveBeenCalledWith('coudrier');
            expect(ffmpegService.setupFFmpeg).toHaveBeenCalledTimes(2);
            expect(mockFFmpegCommand.pipe).toHaveBeenCalledTimes(2);
        });
    });

    describe('getLofiStream', () => {
        it('should return the lofi stream when initialized', async () => {
            await startStreams();
            const stream = getLofiStream();
            expect(stream).toBeDefined();
        });
    });

    describe('getCoudrierStream', () => {
        it('should return the coudrier stream when initialized', async () => {
            await startStreams();
            const stream = getCoudrierStream();
            expect(stream).toBeDefined();
        });
    });
});
