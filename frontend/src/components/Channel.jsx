import React, { useEffect, useRef } from 'react';
import AudioPlayer from "./AudioPlayer";
import Avatar from "./Header/Avatar";
import { setCurrentChannel } from "../store/features/channelSwitcherSlice";
import { useDispatch, useSelector } from "react-redux";
import About from "./Footer/About";
import MuteToggler from "./Commands/MuteToggler";
import Title from "./Body/Title";
import ChannelSwitcher from "./Commands/ChannelSwitcher";
import Loading from "./Loading";
import Unavailable from "./Unavailable";
import Stack from "@mui/material/Stack";
import Background from "./Background";
import ChannelContainer from "./ChannelContainer";


export default function Channel({ channelName }) {
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

            <Background>
                <AudioPlayer audioRef={audioRef} channelName={channelName} />
            </Background>

            {!playing && (
                <Loading />
            )}

            {playing && (
                <>
                    <MuteToggler audioRef={audioRef} channelName={channelName} />
                </>
            )}
        </>
    );
}
