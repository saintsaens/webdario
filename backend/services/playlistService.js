import dotenv from 'dotenv';
import * as trackRepository from '../repositories/trackRepository.js';
import * as playlistRepository from '../repositories/playlistRepository.js';

dotenv.config();

export const createPlaylist = async (channel) => {
    const tracks = await trackRepository.getTracks(channel);
    const trackUrls = await Promise.all(
        tracks.map(track => trackRepository.getTrackUrl(channel, track))
    );
    return trackUrls;
};

export const getPlaylist = async (channel) => {
    const playlistName = channel === 'lofi' 
        ? process.env.LOFI_PLAYLIST_NAME 
        : process.env.COUDRIER_PLAYLIST_NAME;

    return await playlistRepository.getPlaylist(playlistName, channel);
}
