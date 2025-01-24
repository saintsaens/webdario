import React from 'react';
import Mortagne from "../styles/allegiances/mortagne-300.png";
import Aurimont from "../styles/allegiances/aurimont-300.png";
import Koroso from "../styles/allegiances/koroso-300.png";

const Allegiance = () => {
    return (
        <div className="allegiance-container">
            <h1>Choose your allegiance</h1>
            <div className="allegiance-items">
                <div className="allegiance-item">
                    <img src={Mortagne} alt="Mortagne" />
                    <p>Mortagne,<br /> the Scholar</p>
                </div>
                <div className="allegiance-item">
                    <img src={Aurimont} alt="Aurimont" />
                    <p>Aurimont,<br /> the Eloquent</p>
                </div>
                <div className="allegiance-item">
                    <img src={Koroso} alt="Koroso" />
                    <p>Koroso,<br /> the Wise</p>
                </div>
            </div>
        </div>
    );
}

export default Allegiance;