import React, { useRef } from 'react';
import Channel from "./Channel";
import AudioPlayer from "./AudioPlayer";
import AudioControls from "./AudioControls";

const CoudrierStream = () => {
    const audioRef = useRef(null);

    return (
        <>
            <Channel channelName={`coudrier`} />
            <AudioPlayer audioRef={audioRef} />
            <AudioControls audioRef={audioRef} />
        </>
    );
};

export default CoudrierStream;
