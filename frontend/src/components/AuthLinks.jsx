import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../store/features/userSlice";

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
            alert("Logged out successfully");
        } else {
            alert("Logout failed");
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
        <div>
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogin(); }}>Login</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
            <p>{`Hello, ${username}`}</p>
        </div>
    );
}