import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PassThrough } from 'stream';
import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
import { fetchTracks } from "./src/utils/tracks.js";
import { getTrackName } from "./src/utils/ffmpegUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3001;

const tracks = await fetchTracks();

let startTime = Date.now();

// Function to create a stream at the current position
const getStreamAtCurrentPosition = () => {
    const now = Date.now();
    const totalDuration = tracks.reduce((sum, track) => sum + track.duration, 0);
    const elapsed = (now - startTime) % totalDuration;

    let cumulativeDuration = 0;
    let currentTrack;

    for (const track of tracks) {
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
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/now-playing', async (req, res) => {
    const now = Date.now();
    const totalDuration = tracks.reduce((sum, track) => sum + track.duration, 0);
    const elapsed = (now - startTime) % totalDuration;

    let cumulativeDuration = 0;
    let currentTrack;

    for (const track of tracks) {
        cumulativeDuration += track.duration;
        if (elapsed < cumulativeDuration) {
            currentTrack = track;
            break;
        }
    }

    const trackName = await getTrackName(currentTrack.path);

    res.json({ 
        title: trackName,
        duration: currentTrack.duration,
        elapsed: elapsed
    });
});

app.get('/audio-stream', (req, res) => {
    const stream = getStreamAtCurrentPosition();
    res.setHeader('Content-Type', 'audio/mpeg');
    stream.pipe(res);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export { getStreamAtCurrentPosition };
