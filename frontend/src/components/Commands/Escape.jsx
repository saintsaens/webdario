import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Escape = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                navigate("/");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [navigate]);

    return (
        <Box
            sx={{
                position: "fixed",
                top: 16,
                left: 16,
            }}
        >
            <Typography variant="body2">Esc</Typography>
        </Box>
    );
};

export default Escape;