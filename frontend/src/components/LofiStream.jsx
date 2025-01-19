import React, { useRef } from 'react';
import Channel from "./Channel";
import AudioPlayer from "./AudioPlayer";
import AudioControls from "./AudioControls";

const LofiStream = () => {
    const audioRef = useRef(null);

    return (
        <>
            <Channel channelName={`lofi`} />
            <AudioPlayer audioRef={audioRef} />
            <AudioControls audioRef={audioRef} />
        </>
    );
};

export default LofiStream;
