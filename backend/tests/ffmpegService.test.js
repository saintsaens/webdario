import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setupFFmpeg } from '../services/ffmpegService.js';
import ffmpeg from 'fluent-ffmpeg';
import { PLAYLIST_DIR } from '../services/paths.js';

// Mock fluent-ffmpeg
vi.mock('fluent-ffmpeg', () => ({
    default: vi.fn()
}));

let mockCommand;

beforeEach(() => {
    // Create mock chain methods
    mockCommand = {
        input: vi.fn().mockReturnThis(),
        inputOptions: vi.fn().mockReturnThis(),
        setStartTime: vi.fn().mockReturnThis(),
        audioCodec: vi.fn().mockReturnThis(),
        format: vi.fn().mockReturnThis(),
        on: vi.fn().mockReturnThis()
    };

    // Make ffmpeg() return our mock command
    ffmpeg.mockReturnValue(mockCommand);
});

describe('setupFFmpeg', () => {
    it('should create ffmpeg command with correct default parameters', () => {
        const startTime = 0;
        const playlist = 'test-playlist.txt';

        setupFFmpeg(startTime, playlist);

        expect(ffmpeg).toHaveBeenCalled();
        expect(mockCommand.input).toHaveBeenCalledWith(`${PLAYLIST_DIR}/${playlist}`);
        expect(mockCommand.inputOptions).toHaveBeenCalledWith(['-f concat', '-safe 0', '-stream_loop -1']);
        expect(mockCommand.setStartTime).toHaveBeenCalledWith(0);
        expect(mockCommand.audioCodec).toHaveBeenCalledWith('libmp3lame');
        expect(mockCommand.format).toHaveBeenCalledWith('mp3');
        expect(mockCommand.on).toHaveBeenCalledWith('error', expect.any(Function));
    });

    it('should handle negative startTime by setting it to 0', () => {
        const startTime = -100;
        const playlist = 'test-playlist.txt';

        setupFFmpeg(startTime, playlist);

        expect(mockCommand.setStartTime).toHaveBeenCalledWith(0);
    });

    it('should handle NaN startTime by setting it to 0', () => {
        const startTime = NaN;
        const playlist = 'test-playlist.txt';

        setupFFmpeg(startTime, playlist);

        expect(mockCommand.setStartTime).toHaveBeenCalledWith(0);
    });

    it('should convert startTime from milliseconds to seconds', () => {
        const startTime = 5000; // 5000ms = 5s
        const playlist = 'test-playlist.txt';

        setupFFmpeg(startTime, playlist);

        expect(mockCommand.setStartTime).toHaveBeenCalledWith(5);
    });
});
