import React from 'react';
import './styles/style.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { theme } from "./components/Theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./components/AppRoutes";
import About from "./components/About";
import AuthLinks from "./components/AuthLinks";

const App = () => {
    return (
        <>
        <AuthLinks />
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppRoutes />
                </ThemeProvider>
            </Router>
        </>
    );
}

export default App;
