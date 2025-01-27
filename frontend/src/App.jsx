import React from 'react';
import './styles/style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./components/AppRoutes";
import About from "./components/About";

const App = () => {
    return (
        <>
            <Router>
                <AppRoutes />
            </Router>
            <About />
        </>
    );
}

export default App;
