import React, { useRef } from 'react';
import './styles/style.css';
import AudioPlayer from "./components/AudioPlayer";
import AudioControls from "./components/AudioControls";
import About from "./components/About";
import Channel from "./components/Channel";

const App = () => {
    const audioRef = useRef(null);

    return (
        <>
            <Channel />
            <AudioPlayer audioRef={audioRef} />
            <AudioControls audioRef={audioRef} />
            <About />
        </>
    );
}

export default App;
