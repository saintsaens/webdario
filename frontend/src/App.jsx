import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const audioRef = useRef(null);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        promise.then(() => {
          // Autoplay started!
          setAutoplayFailed(false);
          setIsPlaying(true);
        }).catch(error => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
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
    <div className="app">
      <div className="player">
        <h1>Project Dario</h1>
        <audio ref={audioRef}>
          <source src="http://localhost:3001/" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        {autoplayFailed && !isPlaying && <button onClick={handlePlay}>Play</button>}
      </div>
    </div>
  );
}

export default App;