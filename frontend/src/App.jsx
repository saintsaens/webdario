import React from 'react';
import TrackMetadata from './components/TrackMetadata';
import Stream from './components/Stream';
import Clock from './components/Clock';
import './styles/style.css';
import About from "./components/About";

function App() {
    return (
        <>
            <Stream />
            <About />
        </>
    );
}

export default App;