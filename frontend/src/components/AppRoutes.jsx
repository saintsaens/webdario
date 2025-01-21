import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Stream from './Stream';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/lofi" replace />} />
            <Route path="/lofi" element={<Stream channelName={`lofi`}/>} />
            <Route path="/coudrier" element={<Stream channelName={`coudrier`} />} />
        </Routes>
    );
};

export default AppRoutes;
