import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PassThrough } from 'stream';
import * as ffmpegService from '../../services/ffmpegService.js';
import * as playlistService from '../../services/playlistService.js';
import { startStreams, getLofiStream, getCoudrierStream } from '../../services/streamService.js';
import * as durations from '../../utils/durations.js';

// Mock dependencies
vi.mock('stream', () => ({
    PassThrough: vi.fn()
}));

vi.mock('../services/ffmpegService.js', () => ({
    setupFFmpeg: vi.fn()
}));

vi.mock('../services/playlistService.js', () => ({
    createPlaylist: vi.fn()
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
        playlistService.createPlaylist.mockResolvedValue('playlist.txt');
        durations.generateStartTime.mockResolvedValue('00:00:00');
        mockFFmpegCommand.pipe.mockReturnValue(mockFFmpegCommand);
    });

    describe('startStreams', () => {
        it('should initialize both streams correctly', async () => {
            await startStreams();

            expect(PassThrough).toHaveBeenCalledTimes(2);
            expect(playlistService.createPlaylist).toHaveBeenCalledWith('lofi');
            expect(playlistService.createPlaylist).toHaveBeenCalledWith('coudrier');
            expect(ffmpegService.setupFFmpeg).toHaveBeenCalledTimes(2);
            expect(mockFFmpegCommand.pipe).toHaveBeenCalledTimes(2);
        });
    });

    describe('getLofiStream', () => {
        it('should throw error when lofi stream not initialized', () => {
            expect(() => getLofiStream()).toThrow('Lofi stream not initialized');
        });
    
        it('should return the lofi stream when initialized', async () => {
            await startStreams();
            const stream = getLofiStream();
            expect(stream).toBeDefined();
        });
    });

    describe('getCoudrierStream', () => {
        it('should throw error when coudrier stream not initialized', () => {
            expect(() => getCoudrierStream()).toThrow('Coudrier stream not initialized');
        });

        it('should return the coudrier stream when initialized', async () => {
            await startStreams();
            const stream = getCoudrierStream();
            expect(stream).toBeDefined();
        });
    });
});
