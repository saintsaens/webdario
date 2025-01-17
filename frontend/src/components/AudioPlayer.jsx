import React, { useEffect } from 'react';
import dashjs from 'dashjs';
import { computeStartTime } from "../utils/time.js";
import { useDispatch } from "react-redux";
import { setMuted } from "../store/features/audioPlayerSlice.js";

const AudioPlayer = ({ audioRef }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const src = `${backendUrl}/lofi`;
  const startTime = computeStartTime();
  const dispatch = useDispatch();

  useEffect(() => {
    const video = audioRef.current;
    const player = dashjs.MediaPlayer().create();

    if (video) {
      dispatch(setMuted(video.muted));
    }

    player.on(dashjs.MediaPlayer.events.PLAYBACK_NOT_ALLOWED, () => {
      console.log('Playback did not start due to auto play restrictions. Muting audio and reloading');
      if (video) {
        video.muted = true; // Programmatically mute
        dispatch(setMuted(true)); // Update Redux
      }
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
  }, [src, startTime, dispatch]);

  return (
    <>
      <video ref={audioRef}></video>
    </>
  );
};

export default AudioPlayer;
