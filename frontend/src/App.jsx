import React from 'react';
import './styles/style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./components/AppRoutes";
import About from "./components/About";
import KeyPressModal from "./components/KeyPressModal";

const App = () => {
    return (
        <>
        <Router>
            <AppRoutes />
        </Router>
        <KeyPressModal />
        <About />
        </>
    );
}

export default App;
