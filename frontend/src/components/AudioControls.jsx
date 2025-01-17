import React, { useState } from 'react';

const AudioControls = () => {

  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="mute-button">
      <button>
        {isMuted ? 'Unmute (K)' : 'Mute (K)'}
      </button>
    </div>
  );
}

export default AudioControls;
