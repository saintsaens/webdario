import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/joy/Typography";

const WebMuteCommand = () => {
  const isMuted = useSelector((state) => state.audioPlayer.isMuted);

  if (isMuted) return null;

  return (
      <Typography color="neutral">K: mute</Typography>
  );
};

export default WebMuteCommand;
