import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTrack, getTracks, getTrackUrl } from '../../repositories/trackRepository.js';
import { minioClient, getBucketByChannel } from '../../db/index.js';
import { EventEmitter } from 'events';

vi.mock('../../db/index.js', () => ({
    minioClient: {
        getObject: vi.fn(),
        listObjects: vi.fn(),
        presignedUrl: vi.fn()
    },
    getBucketByChannel: vi.fn()
}));

describe('trackRepository', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        getBucketByChannel.mockReturnValue('lofi-bucket');
    });

    describe('getTrack', () => {
        it('should get a track from the correct bucket', async () => {
            const mockTrackStream = 'mock-track-stream';
            minioClient.getObject.mockResolvedValue(mockTrackStream);

            const result = await getTrack('lofi', 'track1.mp3');

            expect(getBucketByChannel).toHaveBeenCalledWith('lofi');
            expect(minioClient.getObject).toHaveBeenCalledWith('lofi-bucket', 'track1.mp3');
            expect(result).toBe(mockTrackStream);
        });

        it('should handle MinIO errors', async () => {
            minioClient.getObject.mockRejectedValue(new Error('MinIO error'));

            await expect(getTrack('lofi', 'track1.mp3')).rejects.toThrow('MinIO error');
        });

        it('should handle invalid channel', async () => {
            getBucketByChannel.mockReturnValue(null);

            await expect(getTrack('invalid', 'track1.mp3')).rejects.toThrow();
        });
    });

    describe('getTracks', () => {
        it('should list all tracks in the bucket', async () => {
            const mockStream = new EventEmitter();
            minioClient.listObjects.mockReturnValue(mockStream);

            const tracksPromise = getTracks('lofi');

            mockStream.emit('data', { name: 'track1.mp3' });
            mockStream.emit('data', { name: 'track2.mp3' });
            mockStream.emit('end');

            const tracks = await tracksPromise;

            expect(getBucketByChannel).toHaveBeenCalledWith('lofi');
            expect(minioClient.listObjects).toHaveBeenCalledWith('lofi-bucket', '', true);
            expect(tracks).toEqual(['track1.mp3', 'track2.mp3']);
        });

        it('should handle stream errors', async () => {
            const mockStream = new EventEmitter();
            minioClient.listObjects.mockReturnValue(mockStream);

            const tracksPromise = getTracks('lofi');
            mockStream.emit('error', new Error('Stream error'));

            await expect(tracksPromise).rejects.toThrow('Stream error');
        });

        it('should handle invalid channel', async () => {
            getBucketByChannel.mockReturnValue(null);

            await expect(getTracks('invalid')).rejects.toThrow();
        });
    });

    describe('getTrackUrl', () => {
        it('should get presigned URL for a track', async () => {
            const mockUrl = 'https://minio.example.com/track1.mp3';
            minioClient.presignedUrl.mockResolvedValue(mockUrl);

            const result = await getTrackUrl('lofi', 'track1.mp3');

            expect(getBucketByChannel).toHaveBeenCalledWith('lofi');
            expect(minioClient.presignedUrl).toHaveBeenCalledWith('GET', 'lofi-bucket', 'track1.mp3');
            expect(result).toBe(mockUrl);
        });

        it('should handle MinIO errors', async () => {
            minioClient.presignedUrl.mockRejectedValue(new Error('MinIO error'));

            await expect(getTrackUrl('lofi', 'track1.mp3')).rejects.toThrow('MinIO error');
        });

        it('should handle invalid channel', async () => {
            getBucketByChannel.mockReturnValue(null);

            await expect(getTrackUrl('invalid', 'track1.mp3')).rejects.toThrow();
        });
    });
});
