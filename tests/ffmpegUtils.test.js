import { describe, it, expect, vi } from 'vitest';
import { getTrackDuration, getTrackName } from '../src/utils/ffmpegUtils';
import ffmpeg from 'fluent-ffmpeg';

// Mock ffmpeg module
vi.mock('fluent-ffmpeg', () => ({
    default: {
        ffprobe: vi.fn((path, callback) => {
            callback(null, { format: { duration: 60, tags: { title: 'Test Title' } } });
        })
    }
}));

describe('ffmpegUtils', () => {
    describe('getTrackDuration', () => {
        it('should throw an error if no trackPath is provided', async () => {
            await expect(getTrackDuration()).rejects.toThrow('No input specified');
        });

        it('should return the track duration in milliseconds', async () => {
            const duration = await getTrackDuration('test.mp3');
            expect(duration).toBe(60000);
        });
    });

    describe('getTrackName', () => {
        it('should throw an error if no trackPath is provided', async () => {
            await expect(getTrackName()).rejects.toThrow('No input specified');
        });

        it('should return the track name', async () => {
            const name = await getTrackName('test.mp3');
            expect(name).toBe('Test Title');
        });

        it('should return "Unknown Title" if no title tag is present', async () => {
            ffmpeg.ffprobe.mockImplementationOnce((path, callback) => {
                callback(null, { format: { duration: 60, tags: {} } });
            });
            const name = await getTrackName('test.mp3');
            expect(name).toBe('Unknown Title');
        });
    });
});