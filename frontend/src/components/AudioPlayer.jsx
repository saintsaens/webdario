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

    player.on(dashjs.MediaPlayer.events.PLAYBACK_NOT_ALLOWED, function (data) {
      console.log('Playback did not start due to auto play restrictions. Muting audio and reloading');
      video.muted = true;
      player.initialize();
      player.attachView(video);
      player.setAutoPlay(true);
      player.attachSource(src, startTime);
    });

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
