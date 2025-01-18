import React from "react";
import { useSelector } from "react-redux";

const Channel = () => {
    const isMuted = useSelector((state) => state.audioPlayer.isMuted);

    return (
        <>
            {!isMuted && <h1>lofi</h1>}
        </>
    );
};

export default Channel;
