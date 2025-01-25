import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Stream from './Stream';
import Allegiance from "./Allegiance";
import AllegianceWelcome from "./AllegianceWelcome";
import AllegianceRemember from "./AllegianceRemember";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/lofi" replace />} />
            <Route path="/lofi" element={<Stream channelName={`lofi`}/>} />
            <Route path="/coudrier" element={<Stream channelName={`coudrier`} />} />
            <Route path="/welcome" element={<AllegianceWelcome />} />
            <Route path="/remember" element={<AllegianceRemember />} />
            <Route path="/allegiance" element={<Allegiance />} />
        </Routes>
    );
};

export default AppRoutes;
