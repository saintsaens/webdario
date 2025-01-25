import React from 'react';
import Butler from "./Butler";
import { Link } from "react-router-dom";
import Escape from "./Escape";

const AllegianceRemember = () => {
    return (
        <>
            <Escape />
            <div className="container">
                <Butler className="butler" />
                <div className="allegiance-welcome">
                    <p>Remember.</p>
                    <p>All they’re offering is stats.</p>
                    <p>Nothing more.</p>
                    <div className="allegiance-welcome-buttons">
                        <Link to="/">
                            <button className="allegiance-welcome-button">Leave</button>
                        </Link>
                        <Link to="/allegiance">
                            <button className="allegiance-welcome-button">Pay tribute →</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllegianceRemember;