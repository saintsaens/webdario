import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

const WebSwitcherCommand = () => {
  const isMuted = useSelector((state) => state.audioPlayer.isMuted);

  if (isMuted) return null;

  return (
      <Typography>⌘+K: switcher</Typography>
  );
};

export default WebSwitcherCommand;
