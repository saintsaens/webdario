import React from 'react';
import './styles/style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./components/AppRoutes";

const App = () => {
    return (
        <>
            <Router>
                <AppRoutes />
            </Router>
        </>
    );
}

export default App;
