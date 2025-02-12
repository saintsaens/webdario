import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import ListeningTime from "./ListeningTime";

const StatsBody = () => {
    const { username, isSubscriber } = useSelector((state) => state.user);

    return (
        <Stack spacing={2} alignItems="center">
            {username &&
                <Typography variant="body1">{`Logged in as ${username}.`}</Typography>
            }
            {!isSubscriber &&
                <Typography>Subscribe for 5€/month to see your listening time.</Typography>
            }
            {isSubscriber &&
                <ListeningTime />
            }
        </Stack>
    );
};

export default StatsBody;
