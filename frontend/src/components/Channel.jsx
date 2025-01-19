import React from "react";
import { useSelector } from "react-redux";

const Channel = ({channelName}) => {
    const isMuted = useSelector((state) => state.audioPlayer.isMuted);

    return (
        <>
            {!isMuted && <h1>{channelName}</h1>}
        </>
    );
};

export default Channel;
