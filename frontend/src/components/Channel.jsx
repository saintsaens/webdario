import React, { useEffect, useRef } from 'react';
import AudioPlayer from "./AudioPlayer";
import Avatar from "./Avatar";
import { setCurrentChannel } from "../store/features/channelSwitcherSlice";
import { useDispatch, useSelector } from "react-redux";
import About from "./About";
import MuteToggler from "./Commands/MuteToggler";
import Title from "./Title";
import ChannelSwitcher from "./Commands/ChannelSwitcher";
import Loading from "./Loading";
import Unavailable from "./Unavailable";

const Stream = ({ channelName }) => {
    const audioRef = useRef(null);
    const playing = useSelector((state) => state.audioPlayer.playing);
    const error = useSelector((state) => state.audioPlayer.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentChannel(channelName));
    }, [dispatch, channelName]);

    if (error) {
        return (
            <Unavailable />
        );
    }
    
    return (
        <>
            <AudioPlayer audioRef={audioRef} channelName={channelName} />
            {!playing && (
                <Loading />
            )}
            {playing && (
                <>
                    <Avatar />
                    <Title channelName={channelName} />
                    <MuteToggler audioRef={audioRef} />
                    <ChannelSwitcher />
                    <About />
                </>
            )}
        </>
    );
};

export default Stream;
