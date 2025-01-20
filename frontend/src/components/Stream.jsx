import React, { useEffect, useRef } from 'react';
import Title from "./Title";
import AudioPlayer from "./AudioPlayer";
import MuteToggler from "./MuteToggler";
import ChannelSwitcher from "./ChannelSwitcher";
import { setCurrentChannel } from "../store/features/channelSwitcherSlice";
import { useDispatch } from "react-redux";

const Stream = ({channelName}) => {
    const audioRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentChannel(channelName));
    }, [dispatch, channelName]);

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
