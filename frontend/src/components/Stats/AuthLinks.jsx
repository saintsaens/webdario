import React from "react";
import { useSelector } from "react-redux";
import { Typography, Stack } from "@mui/material";

export default function AuthLinks() {
    const { username, isSubscriber } = useSelector((state) => state.user);

    return (
        <Stack spacing={2} alignItems="center">
            {username &&
                <Typography variant="body1">{`Logged in as ${username}.`}</Typography>
            }
            {!isSubscriber &&
                <Typography>Subscribe for 5€/month to see your listening time.</Typography>
            }
        </Stack>
    );
}