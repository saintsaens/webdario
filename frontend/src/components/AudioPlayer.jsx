import React, { useEffect } from 'react';
import dashjs from 'dashjs';
import { computeStartTime } from "./utils/time.js";

const AudioPlayer = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const src = `${backendUrl}/lofi`;
  const startTime = computeStartTime();

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
