import React, { useState, useEffect } from 'react';

const AudioControls = () => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'k') {
        setIsMuted((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="mute-button">
      <button>
        {isMuted ? 'Unmute (K)' : 'Mute (K)'}
      </button>
    </div>
  );
};

export default AudioControls;
