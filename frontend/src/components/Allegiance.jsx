import React from 'react';
import Mortagne from "../styles/allegiances/mortagne-300.png";
import Aurimont from "../styles/allegiances/aurimont-300.png";
import Koroso from "../styles/allegiances/koroso-300.png";
import Escape from "./Escape";

const Allegiance = () => {
    return (
        <>
            <Escape />
            <div className="butler-container">
                <h1 className="champions-title">
                    Choose your allegiance
                </h1>
                <div className="champions">
                    <div className="champion">
                        <img src={Mortagne} alt="Mortagne" className="champion-img" />
                        <p className="champion-text">Mortagne,<br /> the Scholar</p>
                    </div>
                    <div className="champion">
                        <img src={Aurimont} alt="Aurimont" className="champion-img" />
                        <p className="champion-text">Aurimont,<br /> the Eloquent</p>
                    </div>
                    <div className="champion">
                        <img src={Koroso} alt="Koroso" className="champion-img" />
                        <p className="champion-text">Koroso,<br /> the Wise</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Allegiance;
