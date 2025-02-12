import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Stack, Button, Link } from "@mui/material";

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
    const { username, sessionStartTime, lastActivity, timeSpent } = useSelector((state) => state.user);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!(event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'p') {
                handleLogin();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            {username ? (
                <Stack direction="row" spacing={2}>
                    <Typography variant="body1">{`Logged in as ${username}.`}</Typography>
                    <Link variant="body1" color="inherit" onClick={handleLogout} sx={{ cursor: "pointer" }}>
                        Logout →
                    </Link>
                </Stack>
            ) : (
                <Stack>
                    <Typography>Pay 5€/month to see your listening time.</Typography>
                </Stack>
            )}
        </Stack>
    );
}