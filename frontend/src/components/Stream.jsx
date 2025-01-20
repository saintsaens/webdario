import React, { useRef } from 'react';
import Title from "./Title";
import AudioPlayer from "./AudioPlayer";
import MuteToggler from "./MuteToggler";
import ChannelSwitcher from "./ChannelSwitcher";

const Stream = ({channelName}) => {
    const audioRef = useRef(null);

    return (
        <>
            <Title channelName={channelName} />
            <AudioPlayer audioRef={audioRef} />
            <MuteToggler audioRef={audioRef} />
            <ChannelSwitcher />
        </>
    );
};

export default Stream;
