import React from 'react';
import { useSelector } from "react-redux";
import { Typography, Stack } from "@mui/material";
import Escape from "./Escape";
import Login from "./Login";
import Logout from "./Logout";

const StatsCommands = () => {
    const { username, isSubscriber } = useSelector((state) => state.user);

    return (
        <Stack spacing={1}>
            <Escape />
            {!username ? <Login /> : <Logout />}
            {!isSubscriber &&
                <Typography variant="body2">S: Subscribe</Typography>
            }
        </Stack>
    );
};

export default StatsCommands;
