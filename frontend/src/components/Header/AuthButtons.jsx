import React from 'react';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const AuthButtons = () => {
    return (
        <Stack>
            <Button component={Link} to="/signin" color="secondary">Sign in</Button>
            <Button component={Link} to="/signup" color="secondary">Sign up</Button>
            <Button color="secondary">Logout</Button>
        </Stack>
    );
};

export default AuthButtons;
