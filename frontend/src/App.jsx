import React from 'react';
import './styles/style.css';
import AudioPlayer from "./components/AudioPlayer";
import AudioControls from "./components/AudioControls";



function App() {
    return (
        <>
            <AudioPlayer />
            <AudioControls />
        </>
    );
}

export default App;
