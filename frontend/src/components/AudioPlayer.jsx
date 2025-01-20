import React, { useEffect } from "react";
import dashjs from "dashjs";
import { computeStartTime } from "../utils/time.js";
import { useDispatch, useSelector } from "react-redux";
import { setMuted, setPlaylistDuration, checkStream } from "../store/features/audioPlayerSlice.js";

const AudioPlayer = ({ audioRef }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const src = `${backendUrl}/lofi`;
  const playlistDuration = useSelector((state) => state.audioPlayer.playlistDuration);
  const error = useSelector((state) => state.audioPlayer.error);
  const dispatch = useDispatch();

  const setupPlayer = (video, start) => {
    const player = dashjs.MediaPlayer().create();

    player.initialize();
    player.attachView(video);
    player.setAutoPlay(true);
    player.attachSource(src, start);

    player.on(dashjs.MediaPlayer.events.PLAYBACK_NOT_ALLOWED, () => {
      console.log("Autoplay restrictions detected. Muting and reloading.");
      video.muted = true;
      dispatch(setMuted(true));
      reloadPlayer(player, video, start);
    });

    player.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, () => {
      const duration = player.duration();
      dispatch(setPlaylistDuration(duration));
    });

    return player;
  };

  const reloadPlayer = (player, video, start) => {
    player.reset();
    setupPlayer(video, start);
  };

  const initializeStream = async () => {
    const video = audioRef.current;
    if (!video) return;

    const result = await dispatch(checkStream(src));
    if (checkStream.rejected.match(result)) {
      // Stop further execution if stream check fails
      return;
    }

    const start = computeStartTime(playlistDuration);
    video.loop = true;
    dispatch(setMuted(video.muted));

    const player = setupPlayer(video, start);

    return () => {
      player.reset();
    };
  };

  useEffect(() => {
    initializeStream();
  }, [src, dispatch, playlistDuration, audioRef]);

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
