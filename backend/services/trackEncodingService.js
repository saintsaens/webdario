import fs from 'fs';
import path from 'path';
import util from 'util';
import ffmpeg from 'fluent-ffmpeg';
import { uploadTrackSegments } from './trackService.js';
import { getTracklist } from "./tracklistService.js";

const unlink = util.promisify(fs.unlink);

export const encodeTrack = (index, playlist, channelPath) => {
    const currentTrack = playlist[index];
    console.log(`Encoding track${index}…`);
    const playlistPath = `${channelPath}/track${index}.mpd`;  // Output MPD file path

    return new Promise((resolve, reject) => {
        const command = ffmpeg()
            .input(currentTrack)
            .output(playlistPath)
            .audioCodec('aac')
            .format('dash')
            .outputOptions([
                '-dash_segment_type', 'mp4',     // Use MP4 segments
                '-use_timeline', '0',             // Disable timeline (use sequence numbers)
                '-use_template', '1',             // Enable templates for segment names
                '-init_seg_name', `track${index}_init.mp4`,  // Name for the initialization segment
                '-media_seg_name', `track${index}_$Number$.m4s`,  // Template for media segments
            ])
            .on('error', (err) => {
                console.error('FFmpeg error:', err.message);
                reject(err);
            })
            .on('end', () => {
                resolve(playlistPath);
            });

        command.run();
    });
};

export const encodeTracks = async (playlist, channel) => {
    const channelPath = `./public/${channel}`;
    const mpdPaths = [];

    for (let index = 0; index < playlist.length; index++) {
        // Encode the track
        const mpdPath = await encodeTrack(index, playlist, channelPath);

        // Upload the track segments
        // console.log(`Uploading segments for track${index}`);
        // await uploadTrackSegments(mpdPath);

        // // Delete the local segment files
        // const directory = path.dirname(mpdPath);
        // const baseName = path.basename(mpdPath, '.mpd');
        // const segmentFiles = fs.readdirSync(directory)
        //     .filter(file => file.startsWith(baseName) && (file.endsWith('.m4s') || file.endsWith('_init.mp4')));

        // for (const file of segmentFiles) {
        //     const filePath = path.join(directory, file);
        //     if (fs.existsSync(filePath)) {
        //         await unlink(filePath);
        //     }
        // }

        // Store the MPD path
        mpdPaths.push(mpdPath);
    }

    return mpdPaths;
};
