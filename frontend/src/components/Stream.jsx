import React, { useEffect, useRef, useState } from 'react';
import dashjs from 'dashjs';
import MuteButton from './MuteButton';

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Stream = ({ path }) => {
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const player = dashjs.MediaPlayer().create(); // Create a new DASH.js player instance
    player.initialize(audioRef.current, `${backend_url}/${path}`, true); // Initialize with the MPD file and autoplay

    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAutoplayFailed(false);
            setIsPlaying(true);
          })
          .catch((error) => {
            if (error.name === 'NotAllowedError') {
              console.warn('Autoplay failed:', error);
            } else {
              console.error('Playback failed:', error);
            }
            setAutoplayFailed(true);
            setIsPlaying(false);
          });
      }
    });

    player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      console.error('DASH.js error:', e);
    });

    return () => player.reset(); // Cleanup on unmount
  }, [path]);

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
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
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
      <audio ref={audioRef} />
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