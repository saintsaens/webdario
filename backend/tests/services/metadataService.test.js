import { describe, it, expect, vi } from 'vitest';
import * as metadataRepository from '../../repositories/metadataRepository.js';
import { getTrackMetadata, updateTrackMetadata } from '../../services/metadataService.js';

// Mock the repository
vi.mock('../repositories/metadataRepository.js', () => ({
    getTrackMetadata: vi.fn(),
    updateTrackMetadata: vi.fn()
}));

describe('getTrackMetadata', () => {
    it('should return track metadata from repository', () => {
        const mockMetadata = {
            name: 'Test Track',
            artist: 'Test Artist'
        };

        metadataRepository.getTrackMetadata.mockReturnValue(mockMetadata);

        const result = getTrackMetadata();

        expect(result).toEqual(mockMetadata);
        expect(metadataRepository.getTrackMetadata).toHaveBeenCalled();
    });
});

describe('updateTrackMetadata', () => {
    it('should update and return track metadata', () => {
        const mockMetadata = {
            name: 'Updated Track',
            artist: 'Updated Artist'
        };

        metadataRepository.updateTrackMetadata.mockReturnValue(mockMetadata);

        const result = updateTrackMetadata();

        expect(result).toEqual(mockMetadata);
        expect(metadataRepository.updateTrackMetadata).toHaveBeenCalled();
    });
});
