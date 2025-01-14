import * as mpdService from './mpdService.js';
import * as playlistService from './playlistService.js';

let coudrierStreamingPlaylist = null;
let lofiStreamingPlaylist = null;

const startStream = async (channel) => {
    const tracklist = await playlistService.createPlaylist(channel);
    const streamingPlaylist = await mpdService.generateUnifiedMPD(tracklist, channel);
    return streamingPlaylist;
};

export const startStreams = async () => {
    // coudrierStreamingPlaylist = await startStream("coudrier");
    lofiStreamingPlaylist = await startStream("lofi");
};

export const getCoudrierStream = () => {
    if (!coudrierStreamingPlaylist) {
        throw new Error('Coudrier stream not initialized');
    }
    return coudrierStreamingPlaylist;
};

export const getLofiStream = () => {
    if (!lofiStreamingPlaylist) {
        throw new Error('Lofi stream not initialized');
    }
    return lofiStreamingPlaylist;
};
