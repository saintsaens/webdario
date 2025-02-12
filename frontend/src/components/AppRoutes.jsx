import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Channel from "./Channel";
import Allegiance from "./Allegiance";
import Pay from "./Pay";
import Stats from "./Stats/Stats";
import AllegianceWelcome from "./AllegianceWelcome";
import AllegianceRemember from "./AllegianceRemember";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/lofi" replace />} />
            <Route path="/lofi" element={<Channel channelName={`lofi`}/>} />
            <Route path="/coudrier" element={<Channel channelName={`coudrier`} />} />
            <Route path="/welcome" element={<AllegianceWelcome />} />
            <Route path="/remember" element={<AllegianceRemember />} />
            <Route path="/allegiance" element={<Allegiance />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/stats" element={<Stats />} />
        </Routes>
    );
};

export default AppRoutes;
