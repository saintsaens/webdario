import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Escape from "./Commands/Escape";
import Stack from '@mui/material/Grid2';
import AuthLinks from "../components/AuthLinks"

const Stats = () => {
    const [time, setTime] = useState("00:02:13:37");

    useEffect(() => {
        let current = 37;
        const interval = setInterval(() => {
            current = current === 40 ? 37 : current + 1;
            setTime(`00:02:13:${current.toString().padStart(2, "0")}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Escape />
            <Stack
                sx={{
                    height: "100%",
                    justifyItems: "center",
                    alignContent: "center",
                }}>
                <AuthLinks />
                <Typography variant="h3">{time}</Typography>
            </Stack >
        </>
    );
};

export default Stats;