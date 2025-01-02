import React, { useEffect, useRef, useState } from 'react';
import PlayButton from './PlayButton';

const Stream = () => {
  const audioRef = useRef(null);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        promise.then(() => {
          setAutoplayFailed(false);
          setIsPlaying(true);
        }).catch(error => {
          console.error('Playback failed:', error);
          setAutoplayFailed(true);
          setIsPlaying(false);
        });
      }
    }
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

  return (
    <div className="stream">
      <audio ref={audioRef}>
        <source src="http://localhost:3001/" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <PlayButton 
        isPlaying={isPlaying}
        autoplayFailed={autoplayFailed}
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Stream;
