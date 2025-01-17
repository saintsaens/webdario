import React, { useState, useEffect } from 'react';

const AudioControls = ({ audioRef }) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'k') {
        const audio = audioRef.current;
        if (audio) {
          audio.muted = !audio.muted;
          setIsMuted(audio.muted);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [audioRef]);

  return (
    <div className="mute-button">
      <button>
        {isMuted ? 'Unmute (K)' : 'Mute (K)'}
      </button>
    </div>
  );
};

export default AudioControls;
