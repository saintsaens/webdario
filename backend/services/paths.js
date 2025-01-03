import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __backendDir = path.join(__dirname, '../');

export const TRACKS_DIR = path.join(__backendDir, process.env.TRACKS_DIR);
export const PLAYLIST_DIR = path.join(__backendDir, process.env.PLAYLIST_DIR);
