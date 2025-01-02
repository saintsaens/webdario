import * as metadataRepository from '../repositories/metadataRepository.js';

export const getTrackMetadata = () => {
    const { name, artist} = metadataRepository.getTrackMetadata();
    return {
        name: name,
        artist: artist,
    }
};

export const updateTrackMetadata = () => {
    const { name, artist} = metadataRepository.updateTrackMetadata();
    return {
        name: name,
        artist: artist,
    }
};
