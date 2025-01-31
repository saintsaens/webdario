import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/joy/Typography";

const WebSwitcherCommand = () => {
  const isMuted = useSelector((state) => state.audioPlayer.isMuted);

  if (isMuted) return null;

  return (
      <Typography color="neutral">⌘+K: switcher</Typography>
  );
};

export default WebSwitcherCommand;
