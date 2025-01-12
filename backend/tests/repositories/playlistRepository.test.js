import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPlaylist } from '../../repositories/playlistRepository.js';
import { minioClient, getBucketByChannel } from '../../db/index.js';
import { Readable } from 'stream';

vi.mock('../../db/index.js', () => ({
    minioClient: {
        putObject: vi.fn()
    },
    getBucketByChannel: vi.fn()
}));

vi.mock('stream', () => ({
    Readable: {
        from: vi.fn()
    }
}));

describe('playlistRepository', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Readable.from.mockImplementation((content) => `stream-${content}`);
    });

    it('should create a playlist in the correct bucket', async () => {
        getBucketByChannel.mockReturnValue('lofi-bucket');
        minioClient.putObject.mockResolvedValue();

        const result = await createPlaylist('playlist.m3u', 'track1.mp3\ntrack2.mp3', 'lofi');

        expect(getBucketByChannel).toHaveBeenCalledWith('lofi');
        expect(Readable.from).toHaveBeenCalledWith('track1.mp3\ntrack2.mp3');
        expect(minioClient.putObject).toHaveBeenCalledWith(
            'lofi-bucket',
            'playlist.m3u',
            'stream-track1.mp3\ntrack2.mp3'
        );
        expect(result).toBe('playlist.m3u');
    });

    it('should handle MinIO errors', async () => {
        getBucketByChannel.mockReturnValue('lofi-bucket');
        minioClient.putObject.mockRejectedValue(new Error('MinIO error'));

        await expect(
            createPlaylist('playlist.m3u', 'content', 'lofi')
        ).rejects.toThrow('MinIO error');
    });

    it('should handle invalid channel', async () => {
        getBucketByChannel.mockReturnValue(null);

        await expect(
            createPlaylist('playlist.m3u', 'content', 'invalid')
        ).rejects.toThrow('Invalid channel: invalid');
    });
});
