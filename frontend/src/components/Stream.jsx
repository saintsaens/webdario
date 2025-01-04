import React, { useEffect, useRef, useState } from 'react';
import MuteButton from './MuteButton';

const Stream = () => {
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        promise.then(() => {
          setAutoplayFailed(false);
          setIsPlaying(true);
        }).catch(error => {
          if (error.name === 'NotAllowedError') {
          } else {
            console.error('Playback failed:', error);
          }
          setAutoplayFailed(true);
          setIsPlaying(false);
        });
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'k') {
        buttonRef.current?.click();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Playback failed:', error);
      });
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="stream">
      <audio ref={audioRef}>
        <source src="http://localhost:3001/api/" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <MuteButton 
        ref={buttonRef}
        isPlaying={isPlaying}
        isMuted={isMuted}
        autoplayFailed={autoplayFailed}
        onPlay={handlePlay}
        onMuteToggle={handleMuteToggle}
      />
    </div>
  );
};

export default Stream;
