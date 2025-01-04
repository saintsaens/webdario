import React, { forwardRef, useEffect } from 'react';

const MuteButton = forwardRef(({ isPlaying, isMuted, autoplayFailed, onPlay, onMuteToggle }, ref) => {
  useEffect(() => {
    document.querySelector(".mute-button").classList.toggle('muted', isMuted);
  }, [isMuted]);

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
    <div className="mute-button">
      <button ref={ref} onClick={handleClick}>{getButtonText()}</button>
    </div>
  );
});

export default MuteButton;
