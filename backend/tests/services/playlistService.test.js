import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as trackRepository from '../../repositories/trackRepository.js';
import * as playlistRepository from '../../repositories/playlistRepository.js';
import { createPlaylist } from '../../services/playlistService.js';

vi.mock('../../repositories/trackRepository.js');
vi.mock('../../repositories/playlistRepository.js');

describe('playlistService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        process.env.LOFI_PLAYLIST_NAME = 'lofi.m3u';
        process.env.COUDRIER_PLAYLIST_NAME = 'coudrier.m3u';
    });

    it('should create a lofi playlist', async () => {
        const mockTracks = ['track1.mp3', 'track2.mp3'];
        vi.spyOn(trackRepository, 'getTracks').mockResolvedValue(mockTracks);
        vi.spyOn(playlistRepository, 'createPlaylist').mockResolvedValue('lofi.m3u');

        const result = await createPlaylist('lofi');

        expect(trackRepository.getTracks).toHaveBeenCalledWith('lofi');
        expect(playlistRepository.createPlaylist).toHaveBeenCalledWith(
            'lofi.m3u',
            'track1.mp3\ntrack2.mp3',
            'lofi'
        );
        expect(result).toBe('lofi.m3u');
    });

    it('should create a coudrier playlist', async () => {
        const mockTracks = ['track3.mp3', 'track4.mp3'];
        vi.spyOn(trackRepository, 'getTracks').mockResolvedValue(mockTracks);
        vi.spyOn(playlistRepository, 'createPlaylist').mockResolvedValue('coudrier.m3u');

        const result = await createPlaylist('coudrier');

        expect(trackRepository.getTracks).toHaveBeenCalledWith('coudrier');
        expect(playlistRepository.createPlaylist).toHaveBeenCalledWith(
            'coudrier.m3u',
            'track3.mp3\ntrack4.mp3',
            'coudrier'
        );
        expect(result).toBe('coudrier.m3u');
    });

    it('should handle empty track list', async () => {
        vi.spyOn(trackRepository, 'getTracks').mockResolvedValue([]);
        vi.spyOn(playlistRepository, 'createPlaylist').mockResolvedValue('lofi.m3u');

        const result = await createPlaylist('lofi');

        expect(playlistRepository.createPlaylist).toHaveBeenCalledWith(
            'lofi.m3u',
            '',
            'lofi'
        );
        expect(result).toBe('lofi.m3u');
    });

    it('should handle trackRepository errors', async () => {
        vi.spyOn(trackRepository, 'getTracks').mockRejectedValue(new Error('Failed to get tracks'));

        await expect(createPlaylist('lofi')).rejects.toThrow('Failed to get tracks');
    });
});
