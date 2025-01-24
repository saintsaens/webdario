import React from 'react';
import './styles/style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./components/AppRoutes";
import About from "./components/About";
import Avatar from "./components/Avatar";
import Allegiance from "./components/Allegiance";

const App = () => {
    return (
        <>
            <Allegiance />
            <Router>
                <AppRoutes />
            </Router>
            <About />
        </>
    );
}

export default App;
