import { createUnifiedMPD } from "./mpdService.js";
import { getTracklist } from "./tracklistService.js";

export const createRadio = async () => {
    console.log("Creating radio…");
    console.log("Creating lofi channel…");
    const lofiChannel = await createChannel(process.env.LOFI_CHANNEL_NAME);
    console.log(`Lofi MPD available: ${lofiChannel}`);

    const radio = {
        lofi: lofiChannel,
    };

    return radio;
};

export const createChannel = async (channelName) => {
    console.log("Fetching tracklist…");
    const tracklist = await getTracklist(channelName);
    
    const channel = await createUnifiedMPD(tracklist, channelName);

    return channel;
};

export const getChannel = (radio, channelName) => {
    if (!radio[channelName]) {
        throw new Error('Channel not found');
    }
    return radio[channelName];
}
