import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Escape = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                navigate("/");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate]);


    return (
        <div className="escape">
            Esc
        </div>
    );
};

export default Escape;
