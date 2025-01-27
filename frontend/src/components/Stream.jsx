import React, { useEffect, useRef } from 'react';
import AudioPlayer from "./AudioPlayer";
import Avatar from "./Avatar";
import { setCurrentChannel } from "../store/features/channelSwitcherSlice";
import { useDispatch } from "react-redux";

const Stream = ({ channelName }) => {
    const audioRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentChannel(channelName));
    }, [dispatch, channelName]);

    return (
        <>
            <Avatar />
            <AudioPlayer audioRef={audioRef} channelName={channelName} />
        </>
    );
};

export default Stream;
