import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __backendDir = path.join(__dirname, '../');

export const TRACKS_DIR = path.join(__backendDir, "../../lofi");
export const PLAYLIST_DIR = path.join(__backendDir, "./assets/music");
