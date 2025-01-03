import { describe, it, expect } from 'vitest';
import ffmpeg from 'fluent-ffmpeg';
import { getTrackDuration, getTrackName, getTrackArtist } from '../services/ffprobeService';

// Mock dependencies
vi.mock('fluent-ffmpeg', () => ({
    default: {
        ffprobe: vi.fn()
    }
}));

describe('getTrackDuration', () => {
    it('should return duration in milliseconds', async () => {
        ffmpeg.ffprobe.mockImplementation((path, callback) => {
            callback(null, {
                format: {
                    duration: 180.5
                }
            });
        });

        const duration = await getTrackDuration('test.mp3');
        expect(duration).toBe(180500);
    });

    it('should handle ffprobe errors', async () => {
        ffmpeg.ffprobe.mockImplementation((path, callback) => {
            callback(new Error('ffprobe failed'), null);
        });

        await expect(getTrackDuration('test.mp3'))
            .rejects.toThrow('ffprobe failed');
    });
});

describe('getTrackName', () => {
    it('should return track title from metadata', async () => {
        ffmpeg.ffprobe.mockImplementation((path, callback) => {
            callback(null, {
                format: {
                    tags: {
                        title: 'Test Track'
                    }
                }
            });
        });

        const title = await getTrackName('test.mp3');
        expect(title).toBe('Test Track');
    });

    it('should return filename without extension when no title tag exists', async () => {
        ffmpeg.ffprobe.mockImplementation((path, callback) => {
            callback(null, {
                format: {
                    tags: {}
                }
            });
        });

        const title = await getTrackName('test.mp3');
        expect(title).toBe('test');
    });
});

describe('getTrackArtist', () => {
    it('should return artist from metadata', async () => {
        ffmpeg.ffprobe.mockImplementation((path, callback) => {
            callback(null, {
                format: {
                    tags: {
                        artist: 'Test Artist'
                    }
                }
            });
        });

        const artist = await getTrackArtist('test.mp3');
        expect(artist).toBe('Test Artist');
    });

    it('should return "Unknown Artist" when no artist tag exists', async () => {
        ffmpeg.ffprobe.mockImplementation((path, callback) => {
            callback(null, {
                format: {
                    tags: {}
                }
            });
        });

        const artist = await getTrackArtist('test.mp3');
        expect(artist).toBe('Unknown Artist');
    });
});
