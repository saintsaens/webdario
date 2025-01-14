import ffmpeg from 'fluent-ffmpeg';

// Encode a single track using ffmpeg
export const encodeTrack = (index, playlist, channelPath) => {
    const currentTrack = playlist[index];
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

// Encode all tracks and generate the corresponding MPD files
export const encodeTracks = async (playlist, channel) => {
    const channelPath = `./public/${channel}`;
    const trackPromises = [];

    for (let i = 0; i < playlist.length; i++) {
        trackPromises.push(encodeTrack(i, playlist, channelPath));
    }

    const mpdPaths = await Promise.all(trackPromises);
    return mpdPaths;
}
