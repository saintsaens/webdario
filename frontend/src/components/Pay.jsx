import React from 'react';
import { Typography } from '@mui/material';
import Escape from "./Commands/Escape";
import Stack from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from "@mui/material/CardActionArea";
import LoggedState from "./LoggedState";


const Pay = () => {
    return (
        <>
            <Escape />
            <LoggedState />
            <Stack
                sx={{
                    height: "100%",
                    justifyItems: "center",
                    alignContent: "center",
                }}>
                <Typography variant="h4">
                    Know your listening time
                </Typography>
                <Card variant="outlined">
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5">
                                5€/month
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Stack >
        </>
    );
};

export default Pay;
