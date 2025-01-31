import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setMuted } from "../../store/features/audioPlayerSlice";
import WebCommands from "./WebCommands";

const WebMuteToggler = ({ audioRef }) => {
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!(event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        handleToggleMute();
      }

    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [audioRef]);


  return (
    <>
      {isMuted && (
        <div className="unmute-overlay">
          <div className="unmute-text-web">
            {!error && 'K to unmute'}
          </div>
        </div>
      )}
      <WebCommands />
    </>
  );
};

export default WebMuteToggler;
