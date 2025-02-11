import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Escape from "./Commands/Escape";
import Stack from '@mui/material/Grid2';
import AuthLinks from "../components/AuthLinks";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateLastActivity, updateSessionStartTime } from "../store/features/userSlice";

const Stats = () => {
    const dispatch = useDispatch();
    const { timeSpent, userId } = useSelector((state) => state.user);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (userId) {
            const updateActivity = () => {
                dispatch(updateLastActivity()); // Send last activity update to backend
            };

            dispatch(updateSessionStartTime());
            const interval = setInterval(updateActivity, 60000); // Run every 60 seconds

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (timeSpent !== 0) {
            setElapsedTime(timeSpent);
        }
    }, [timeSpent]);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds) => {
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

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
                <Typography variant="h3">{formatTime(elapsedTime)}</Typography>
            </Stack >
        </>
    );
};

export default Stats;