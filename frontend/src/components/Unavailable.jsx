import React from 'react';
import Typography from '@mui/joy/Typography';
import FullOverlay from "./FullOverlay";

const Unavailable = () => {
    return (
        <FullOverlay>
            <Typography level="h1">
                Coudradio not available right now.
            </Typography>
        </FullOverlay>
    );
};

export default Unavailable;