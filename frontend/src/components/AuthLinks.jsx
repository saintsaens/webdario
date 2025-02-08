import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/features/userSlice";
import { Typography, Stack, Button } from "@mui/material";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = `${import.meta.env.VITE_BACKEND_URL}/auth/oauth2/redirect/google`;

const handleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid%20profile%20email&state=secureRandomState`;

    window.location.href = googleAuthUrl; // Redirect user to Google
};

const handleLogout = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        if (response.ok) {
            window.location.reload(); // Ensure UI updates on logout
        } else {
            console.log("Logout failed");
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export default function AuthLinks() {
    const dispatch = useDispatch();
    const { username } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            {username ? (
                <>
                    <Typography variant="body1">{`Logged in as ${username}.`}</Typography>
                    <Button variant="contained" onClick={handleLogout}>
                        Logout
                    </Button>
                </>
            ) : (
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login with Google
                </Button>
            )}
        </Stack>
    );
}