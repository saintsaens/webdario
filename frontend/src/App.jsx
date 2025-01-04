import React from 'react';
import TrackMetadata from './components/TrackMetadata';
import LofiStream from './components/LofiStream';
import Clock from './components/Clock';
import './styles/style.css';
import About from "./components/About";

function App() {
    return (
        <>
            <LofiStream />
            <About />
        </>
    );
}

export default App;