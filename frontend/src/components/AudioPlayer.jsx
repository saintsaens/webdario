import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';
import { computeStartTime } from "./utils/time.js";

const AudioPlayer = ({ audioRef }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const src = `${backendUrl}/lofi`;
  const startTime = computeStartTime();

  useEffect(() => {
    const video = audioRef.current;
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
  }, [src, startTime]);

  return (
    <>
      <video ref={audioRef} controls></video>
    </>
  );
};

export default AudioPlayer;
