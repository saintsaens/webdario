import React from 'react';
import Stack from "@mui/material/Stack";
import Escape from "../Commands/Escape";
import { Typography } from "@mui/material";

const StatsCommands = () => {
  return (
    <Stack spacing={1}>
      <Escape />
      <Typography variant="body2">P: pay</Typography>
    </Stack>
  );
};

export default StatsCommands;
