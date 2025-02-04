import React from 'react';
import WebMuteCommand from "./WebMuteCommand";
import WebSwitcherCommand from "./WebSwitcherCommand";
import Stack from "@mui/material/Stack";

const WebCommands = () => {
  return (
    <Stack>
      <WebMuteCommand />
      <WebSwitcherCommand />
    </Stack>
  );
};

export default WebCommands;
