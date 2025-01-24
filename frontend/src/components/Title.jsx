import React from "react";
import { useSelector } from "react-redux";

const Title = ({channelName}) => {
    const isMuted = useSelector((state) => state.audioPlayer.isMuted);

    return (
        <>
            {!isMuted && <h1 className="channel-name">{channelName}</h1>}
        </>
    );
};

export default Title;
