import React, { useEffect } from "react";
import dashjs from "dashjs";
import { computeStartTime } from "../utils/time.js";
import { useDispatch, useSelector } from "react-redux";
import { setMuted, setPlaylistDuration, checkStream } from "../store/features/audioPlayerSlice.js";

const AudioPlayer = ({ audioRef, channelName }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL_LOCAL;
  const src = `${backendUrl}/${channelName}`;
  const playlistDuration = useSelector((state) => state.audioPlayer.playlistDuration);
  const error = useSelector((state) => state.audioPlayer.error);
  const dispatch = useDispatch();
  let player = null; // Keep track of the Dash.js player instance

  const setupPlayer = (video, start) => {
    player = dashjs.MediaPlayer().create();

    player.initialize();
    player.attachView(video);
    player.setAutoPlay(true);
    player.attachSource(src, start);

    player.on(dashjs.MediaPlayer.events.PLAYBACK_NOT_ALLOWED, () => {
      console.log("Autoplay restrictions detected. Muting and reloading.");
      video.muted = true;
      dispatch(setMuted(true));
      reloadPlayer(video, start);
    });

    player.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, () => {
      const duration = player.duration();
      // dispatch(setPlaylistDuration(duration));
    });
  };

  const reloadPlayer = (video, start) => {
    console.log("Reloading player…");
    cleanupPlayer();
    setupPlayer(video, start);
  };

  const cleanupPlayer = () => {
    if (player) {
      player.reset();
      player = null; // Ensure the old player instance is removed
    }
  };

  const initializeStream = async () => {
    const video = audioRef.current;
    if (!video) return;

    // Clean up any existing player before initializing
    cleanupPlayer();

    const result = await dispatch(checkStream(src));
    if (checkStream.rejected.match(result)) {
      return;
    }

    const start = computeStartTime(playlistDuration);

    video.loop = true;
    dispatch(setMuted(video.muted));
    setupPlayer(video, start);
  };

  useEffect(() => {
    initializeStream();

    return () => {
      cleanupPlayer(); // Ensure cleanup when the component unmounts or reinitializes
    };
  }, [src, dispatch, playlistDuration]);

  if (error) {
    return (
      <div className="overlay-text">
        Coudradio not available right now.
      </div>
    );
  }

  return <video ref={audioRef} />;
};

export default AudioPlayer;
