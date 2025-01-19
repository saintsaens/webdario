import React, { useEffect } from 'react';
import dashjs from 'dashjs';
import { computeStartTime } from "../utils/time.js";
import { useDispatch, useSelector } from "react-redux";
import { setMuted, setPlaylistDuration } from "../store/features/audioPlayerSlice.js";

const AudioPlayer = ({ audioRef }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const src = `${backendUrl}/lofi`;
  const playlistDuration = useSelector((state) => state.audioPlayer.playlistDuration);
  const dispatch = useDispatch();

  const initializePlayer = (player, video, start) => {
    player.on(dashjs.MediaPlayer.events.PLAYBACK_NOT_ALLOWED, () => {
      console.log(
        'Playback did not start due to autoplay restrictions. Muting audio and reloading.'
      );
      if (video) {
        video.muted = true;
        dispatch(setMuted(true));
      }
      reloadPlayer(player, video, start);
    });

    reloadPlayer(player, video, start);
  };

  const updatePlaylistDuration = (player) => {
    player.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, () => {
      const duration = player.duration();
      dispatch(setPlaylistDuration(duration));
    });
  };

  const reloadPlayer = (player, video, start) => {
    player.initialize();
    player.attachView(video);
    player.setAutoPlay(true);
    player.attachSource(src, start);
  };

  useEffect(() => {
    const video = audioRef.current;
    if (!video) return;

    const player = dashjs.MediaPlayer().create();
    const start = computeStartTime(playlistDuration);

    // Set video attributes and dispatch initial state
    video.loop = true;
    dispatch(setMuted(video.muted));

    initializePlayer(player, video, start);
    updatePlaylistDuration(player);

    return () => {
      player.reset();
    };
  }, [src, dispatch, playlistDuration]);

  return (
    <>
      <video ref={audioRef} />
    </>
  );
};

export default AudioPlayer;
