import React from 'react';
import { Box } from "@mui/material";
import Alert from '@mui/material/Alert';

const LoggedState = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 16,
                right: 16,
            }}
        >
            <Alert severity="success"></Alert>
        </Box>
    );
};

export default LoggedState;
