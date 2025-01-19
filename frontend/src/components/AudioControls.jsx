import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setMuted } from "../store/features/audioPlayerSlice";
import useIsMobile from "../hooks/useIsMobile";

const AudioControls = ({ audioRef }) => {
  const isMuted = useSelector((state) => state.audioPlayer.isMuted);
  const isMobile = useIsMobile();
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
      if (!(event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        handleToggleMute();
      }

    };

    const handleTouchStart = (event) => {
      if (event.touches.length === 1) {
        handleToggleMute();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouchStart);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouchStart);
    }
  }, [audioRef]);


  return (
    <>
      {isMuted && (
        <div className="overlay">
          <div className="overlay-text">{isMobile ? 'Tap to unmute' : 'K to unmute'}</div>
        </div>
      )}
      <div className="mute-label">
        {!isMuted && (isMobile ? 'Tap to mute' : 'K: mute')}
      </div>
      <div className="switch-label">
        {!isMuted && !isMobile && '⌘+K: switch'}
      </div>
    </>
  );
};

export default AudioControls;
