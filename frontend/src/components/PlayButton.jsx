import React from 'react';

const PlayButton = ({ isPlaying, autoplayFailed, onPlay }) => {
  return (
    <div className="play-controls">
      {autoplayFailed && !isPlaying && (
        <button onClick={onPlay}>Play</button>
      )}
      {isPlaying && <div className="playing-indicator">Playing…</div>}
    </div>
  );
};

export default PlayButton;
