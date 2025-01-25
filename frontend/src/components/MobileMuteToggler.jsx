import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setMuted } from "../store/features/audioPlayerSlice";

const MobileMuteToggler = ({ audioRef }) => {
    const isMuted = useSelector((state) => state.audioPlayer.isMuted);
    const error = useSelector((state) => state.audioPlayer.error);
    const dispatch = useDispatch();

    const handleToggleMute = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = !audio.muted;
            dispatch(setMuted(audio.muted));
        }
    };

    return (
        <>
            {isMuted && (
                <div className="unmute-overlay">
                    <button
                        className="unmute-button-mobile"
                        onClick={handleToggleMute}
                    >
                        {!error && "Unmute"}
                    </button>
                </div>
            )}
            <div className="mute-label">
                <button
                    className="mute-button-mobile"
                    onClick={handleToggleMute}
                >
                    {!isMuted && 'Tap: mute'}
                </button>
            </div>
        </>
    );
};

export default MobileMuteToggler;
