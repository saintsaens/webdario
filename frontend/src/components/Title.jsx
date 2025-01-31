import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/joy/Typography";

const Title = ({ channelName }) => {
    const isMuted = useSelector((state) => state.audioPlayer.isMuted);

    return (
        !isMuted && (
            <Typography
                level="h1"
            >
                {channelName}
            </Typography>
        )
    );
};

export default Title;
