import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const WebStatsCommand = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "#") {
        navigate("/stats");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <Typography variant="body2">#: stats {userId && "🟢"}</Typography>
  );
};

export default WebStatsCommand;
