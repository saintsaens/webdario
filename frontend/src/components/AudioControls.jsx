import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setMuted } from "../store/features/audioPlayerSlice";

const AudioControls = ({ audioRef }) => {
  const isMuted = useSelector((state) => state.audioPlayer.isMuted);
  const dispatch = useDispatch();
  
  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      dispatch(setMuted(audio.muted));
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'k') {
        handleToggleMute();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [audioRef]);


  return (
    <>
      {isMuted && (
        <div className="overlay">
          <div className="overlay-text">K to unmute</div>
        </div>
      )}
      <div className="mute-button">
          {!isMuted && 'K to mute'}
      </div>
    </>
  );
};


export default AudioControls;
