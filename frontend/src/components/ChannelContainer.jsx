import React from 'react';
import Box from "@mui/material/Box";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import Grid from '@mui/material/Grid2';
import WebCommands from "./Commands/WebCommands";
import Avatar from "./Header/Avatar";

export default function ChannelContainer({ channelName }) {
    return (
        <Grid container
            sx={{
                height: "100%",
                padding: 2,
            }}>
            <Grid
                size={6}
                sx={{ height: "20%" }}
            >
                <WebCommands />
            </Grid>
            <Grid
                size={6}
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    height: "20%"
                }}
            >
                <Avatar />
            </Grid>
            <Grid
                size={12}
                sx={{ height: "60%" }}
            >
                <Body channelName={channelName} />
            </Grid>
            <Grid
                size={12}
                sx={{ height: "20%" }}
            >
                <Footer />
            </Grid>
        </Grid>
    );
}
