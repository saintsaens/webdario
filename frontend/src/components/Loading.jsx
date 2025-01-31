import React from 'react';
import Typography from '@mui/joy/Typography';
import FullOverlay from "./FullOverlay";

const Loading = () => {
    return (
        <FullOverlay>
            <Typography level="h1">
                Loading…
            </Typography>
        </FullOverlay>
    );
};

export default Loading;