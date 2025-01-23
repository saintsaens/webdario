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
                <div className="overlay">
                    <button
                        className="mobile-unmute-button"
                        onClick={handleToggleMute}
                    >
                        {!error && "Unmute"}
                    </button>
                </div>
            )}
            <div className="mute-label">
                <button
                    className="mobile-mute-button"
                    onClick={handleToggleMute}
                >
                    <div className="mobile-mute-button-text">
                        {!isMuted && 'Tap: mute'}
                    </div>
                </button>
            </div>
        </>
    );
};

export default MobileMuteToggler;
