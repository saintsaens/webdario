import React, { forwardRef } from 'react';

const PlayButton = forwardRef(({ isPlaying, isMuted, autoplayFailed, onPlay, onMuteToggle }, ref) => {
  const handleClick = () => {
    if (!isPlaying) {
      onPlay();
    } else {
      onMuteToggle();
    }
  };

  const getButtonText = () => {
    if (!isPlaying) {
      return 'Unmute (K)';
    }
    return isMuted ? 'Unmute (K)' : 'Mute (K)';
  };

  return (
    <div className="play-controls">
      <button ref={ref} onClick={handleClick}>{getButtonText()}</button>
    </div>
  );
});

export default PlayButton;
