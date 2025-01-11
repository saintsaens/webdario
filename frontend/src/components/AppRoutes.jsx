import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LofiStream from './LofiStream';
import CoudrierStream from './CoudrierStream';
import About from './About';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/lofi" replace />} />
            <Route path="/lofi" element={<LofiStream />} />
            <Route path="/coudrier" element={<CoudrierStream />} />
        </Routes>
    );
};

export default AppRoutes;
