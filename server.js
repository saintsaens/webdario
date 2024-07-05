import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PassThrough } from 'stream';
import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3001;

const AMBIENT_OST_DIR = path.join(__dirname, 'Ambient OST');

// Read the Ambient OST directory and create the TRACKS array
const TRACKS = fs.readdirSync(AMBIENT_OST_DIR)
    .filter(file => file !== '.DS_Store')
    .map(file => ({
        path: path.join(AMBIENT_OST_DIR, file),
        duration: 0
    }));

let startTime = Date.now();

// Get track duration using ffmpeg
const getTrackDurations = () => {
    return Promise.all(TRACKS.map(track => {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(track.path, (err, metadata) => {
                if (err) {
                    return reject(err);
                }
                track.duration = metadata.format.duration * 1000; // duration in milliseconds
                resolve();
            });
        });
    }));
};

// Function to create a stream at the current position
const getStreamAtCurrentPosition = () => {
    const now = Date.now();
    const totalDuration = TRACKS.reduce((sum, track) => sum + track.duration, 0);
    const elapsed = (now - startTime) % totalDuration;

    let cumulativeDuration = 0;
    let currentTrack;

    for (const track of TRACKS) {
        cumulativeDuration += track.duration;
        if (elapsed < cumulativeDuration) {
            currentTrack = track;
            break;
        }
    }

    const trackElapsed = elapsed - (cumulativeDuration - currentTrack.duration);
    const passthrough = new PassThrough();

    ffmpeg(currentTrack.path)
        .setStartTime(trackElapsed / 1000) // Start time in seconds
        .audioCodec('libmp3lame')
        .format('mp3')
        .on('error', (err) => {
            console.error('Error processing track:', err);
        })
        .pipe(passthrough);

    return passthrough;
};

app.use(express.static(path.join(__dirname)));

app.get('/stream', (req, res) => {
    const stream = getStreamAtCurrentPosition();
    res.setHeader('Content-Type', 'audio/mpeg');
    stream.pipe(res);
});

getTrackDurations().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error getting track durations:', err);
});

export { getStreamAtCurrentPosition, getTrackDurations };