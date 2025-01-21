import { createUnifiedMPD } from "./mpdService.js";
import { getTracklist } from "./tracklistService.js";

export const createRadio = async () => {
    console.log("Creating radio…");
    // console.log("Creating lofi channel…");
    // const lofiChannel = await createChannel(process.env.LOFI_CHANNEL_NAME);
    // console.log(`Lofi MPD available: ${lofiChannel}`);
    console.log("Creating coudrier channel…");
    const coudrierChannel = await createChannel(process.env.COUDRIER_CHANNEL_NAME);
    console.log(`Coudrier MPD available: ${coudrierChannel}`);

    const radio = {
        // lofi: lofiChannel,
        coudrier: coudrierChannel
    };

    return radio;
};

export const createChannel = async (channelName) => {
    console.log("Fetching tracklist…");
    const tracklist = await getTracklist(channelName);
    console.log(`Found ${tracklist.length} tracks`);
    
    const channel = await createUnifiedMPD(tracklist, channelName);

    return channel;
};

export const getChannel = (radio, channelName) => {
    if (!radio[channelName]) {
        throw new Error('Channel not found');
    }
    return radio[channelName];
}
