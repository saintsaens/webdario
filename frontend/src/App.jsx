import React, { useRef } from 'react';
import './styles/style.css';
import AudioPlayer from "./components/AudioPlayer";
import AudioControls from "./components/AudioControls";
import About from "./components/About";

const App = () => {
    const audioRef = useRef(null);

    return (
        <>
            <AudioPlayer audioRef={audioRef}/>
            <AudioControls audioRef={audioRef}/>
            <About />
        </>
    );
}

export default App;
