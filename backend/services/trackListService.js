import fs from 'fs';
import path from "path";
import dotenv from 'dotenv';
import { PLAYLIST_DIR, LOFI_TRACKS_DIR, COUDRIER_TRACKS_DIR } from './paths.js';

dotenv.config();

export const createTrackListFile = async (channel) => {
    let tracksDirectory;
    let playlistName;

    if (channel === 'lofi') {
        tracksDirectory = LOFI_TRACKS_DIR;
        playlistName = process.env.LOFI_PLAYLIST_NAME;
    } else if (channel === 'coudrier') {
        tracksDirectory = COUDRIER_TRACKS_DIR;
        playlistName = process.env.COUDRIER_PLAYLIST_NAME;
    } else {
        throw new Error('Invalid channel');
    }

    const files = fs.readdirSync(tracksDirectory).filter(file => file !== '.DS_Store');
    const paths = files.map(file => path.join(tracksDirectory, file));

    // Create content for the playlist in ffmpeg's required format
    const fileListContent = paths.map(trackPath => `file '${trackPath}'`).join('\n');

    // Write the content to the output file
    const filePath = path.join(PLAYLIST_DIR, playlistName);
    fs.writeFileSync(filePath, fileListContent, 'utf8');
    
    return playlistName;
};
