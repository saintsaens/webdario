import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import './styles/style.css';

function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
