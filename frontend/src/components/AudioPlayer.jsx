import React, { useEffect } from 'react';
import dashjs from 'dashjs';

const AudioPlayer = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const src = `${backendUrl}/lofi`;
  let startTime = 260;

  useEffect(() => {
    const video = document.querySelector('video');
    const player = dashjs.MediaPlayer().create();
    video.muted = true;
    video.loop = true;
    player.initialize();
    player.attachView(video);
    player.setAutoPlay(true);
    player.attachSource(src, startTime);
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
