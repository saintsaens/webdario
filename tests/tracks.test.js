import { describe, it, expect } from 'vitest';
import { fetchTracks } from '../src/tracks';
import fs from 'fs';
import path from 'path';
import { getTrackDuration } from '../src/ffmpegUtils';
import { AMBIENT_OST_DIR } from '../src/paths';

// Mock dependencies
vi.mock('fs');
vi.mock('path');
vi.mock('../src/ffmpegUtils');

describe('tracks', () => {
    describe('fetchTracks', () => {
        it('should handle multiple audio file formats', async () => {
            fs.readdirSync.mockReturnValue(['track1.mp3', 'track2.wav', 'track3.ogg']);
            path.join.mockImplementation((dir, file) => `${dir}/${file}`);
            getTrackDuration.mockResolvedValue(180000);

            const tracks = await fetchTracks();

            expect(tracks).toHaveLength(3);
            expect(tracks.map(t => t.path)).toEqual([
                expect.stringContaining('track1.mp3'),
                expect.stringContaining('track2.wav'),
                expect.stringContaining('track3.ogg')
            ]);
        });

        it('should handle empty directory', async () => {
            fs.readdirSync.mockReturnValue([]);
            const tracks = await fetchTracks();
            expect(tracks).toHaveLength(0);
            expect(tracks).toEqual([]);
        });

        it('should handle duration fetching errors', async () => {
            fs.readdirSync.mockReturnValue(['track1.mp3', 'track2.mp3']);
            path.join.mockImplementation((dir, file) => `${dir}/${file}`);
            getTrackDuration
                .mockResolvedValueOnce(180000)
                .mockRejectedValueOnce(new Error('Duration fetch failed'));

            await expect(fetchTracks()).rejects.toThrow('Duration fetch failed');
        });

        it('should construct correct file paths', async () => {
            fs.readdirSync.mockReturnValue(['track1.mp3']);
            path.join.mockImplementation((dir, file) => `${dir}/${file}`);
            getTrackDuration.mockResolvedValue(180000);

            await fetchTracks();

            expect(path.join).toHaveBeenCalledWith(AMBIENT_OST_DIR, 'track1.mp3');
        });

        it('should fetch durations in parallel', async () => {
            fs.readdirSync.mockReturnValue(['track1.mp3', 'track2.mp3']);
            path.join.mockImplementation((dir, file) => `${dir}/${file}`);

            const durationPromises = [
                new Promise(resolve => setTimeout(() => resolve(180000), 100)),
                new Promise(resolve => setTimeout(() => resolve(240000), 50))
            ];

            getTrackDuration
                .mockImplementationOnce(() => durationPromises[0])
                .mockImplementationOnce(() => durationPromises[1]);

            const startTime = Date.now();
            const tracks = await fetchTracks();
            const duration = Date.now() - startTime;

            expect(tracks).toHaveLength(2);
            expect(duration).toBeLessThan(150); // Should take ~100ms, not 150ms
            expect(tracks[0].duration).toBe(180000);
            expect(tracks[1].duration).toBe(240000);
        });

        it('should return an array of tracks with paths and durations', async () => {
            fs.readdirSync.mockReturnValue(['track1.mp3', 'track2.mp3']);
            path.join.mockImplementation((dir, file) => `${dir}/${file}`);
            getTrackDuration.mockResolvedValue(180000);

            const tracks = await fetchTracks();

            expect(tracks).toHaveLength(2);
            expect(tracks[0]).toEqual({
                path: expect.stringContaining('track1.mp3'),
                duration: 180000
            });
        });

        it('should filter out .DS_Store files', async () => {
            fs.readdirSync.mockReturnValue(['track1.mp3', '.DS_Store']);
            path.join.mockImplementation((dir, file) => `${dir}/${file}`);
            getTrackDuration.mockResolvedValue(180000);

            const tracks = await fetchTracks();

            expect(tracks).toHaveLength(1);
            expect(tracks[0].path).toContain('track1.mp3');
        });

        it('should throw an error if reading directory fails', async () => {
            fs.readdirSync.mockImplementation(() => {
                throw new Error('Failed to read directory');
            });

            await expect(fetchTracks()).rejects.toThrow('Failed to read directory');
        });
    });
});

