import React from 'react';
import { Link } from "react-router-dom";
import Butler from "../styles/allegiances/butler-300.png";

const Avatar = () => {
    return (
        <>
            <Link to="/welcome">
                <img src={Butler} alt="Top Right" className="avatar" />
            </Link>
        </>
    );
}

export default Avatar;
