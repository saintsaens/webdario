import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import AuthLinks from "./AuthLinks";
import { useSelector } from "react-redux";
import StatsCommands from "./StatsCommands";
import StatsBody from "./StatsBody";

const Stats = () => {
    return (
        <Stack
            sx={{
                height: "100vh",
                width: "100%",
                padding: 2,
            }}>
            <Box sx={{ height: "20%" }}>
                <StatsCommands />
            </Box>
            <Stack spacing={2}
                sx={{
                    height: "60%",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <StatsBody />
            </Stack >
        </Stack>
    );
};

export default Stats;
