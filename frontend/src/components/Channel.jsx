import React, { useEffect, useRef } from 'react';
import AudioPlayer from "./AudioPlayer";
import { setCurrentChannel } from "../store/features/channelSwitcherSlice";
import { useDispatch, useSelector } from "react-redux";
import MuteToggler from "./Commands/MuteToggler";
import Loading from "./Loading";
import Unavailable from "./Unavailable";

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
            <AudioPlayer audioRef={audioRef} channelName={channelName} />

            {!playing && (
                <Loading />
            )}

            {playing && (
                <MuteToggler audioRef={audioRef} channelName={channelName} />
            )}
        </>
    );
}
