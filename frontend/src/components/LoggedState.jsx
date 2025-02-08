import React from 'react';
import { Box } from "@mui/material";
import Alert from '@mui/material/Alert';

const LoggedState = () => {
    return (
        <Alert
            severity="success"
            sx={{
                position: "fixed",
                top: 16,
                right: 16,
                backgroundColor: "background.default",
            }}
        >
        </Alert>
    );
};

export default LoggedState;
