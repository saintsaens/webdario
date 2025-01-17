import React, { useEffect, useRef, useState } from 'react';
import dashjs from 'dashjs';

const AudioPlayer = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const src = `${backendUrl}/lofi`;

  useEffect(() => {
    // Masquerading audio as video, to enable the muted autoplay trick
    const video = document.querySelector('video');
    const player = dashjs.MediaPlayer().create();
    video.muted = true;
    player.initialize(video, src, true);
    return () => {
      player.reset();
    };
  }, []);

  return (
    <>
      <video controls></video>
    </>
  );
};

export default AudioPlayer;
