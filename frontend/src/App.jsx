import React from 'react';
import TrackMetadata from './components/TrackMetadata';
import Stream from './components/Stream';
import Clock from './components/Clock';

function App() {
    return (
        <>
            <Clock />
            <TrackMetadata />
            <Stream />
        </>
    );
}

export default App;