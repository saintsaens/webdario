import React from 'react';
import Butler from "./Butler";
import { Link } from "react-router-dom";
import Escape from "./Escape";

const AllegianceWelcome = () => {
    return (
        <>
        <Escape />
            <div className="container">
                <Butler className="butler" />
                <div className="allegiance-welcome">
                    <p>This path leads to stats.</p>
                    <p>They will be granted by your liege, in exchange for a tribute.</p>
                    <p>5€/month.</p>
                    <div className="allegiance-welcome-buttons">
                        <Link to="/">
                            <button className="allegiance-welcome-button">Leave</button>
                        </Link>
                        <Link to="/remember">
                            <button className="allegiance-welcome-button">Continue →</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllegianceWelcome;
