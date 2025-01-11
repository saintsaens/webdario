import React from 'react';

const About = () => {
  const handleClick = () => {
    window.open('https://github.com/saintsaens/webdario', '_blank', 'noopener,noreferrer');
  };

  return (
    <button className="about-button" onClick={handleClick}>
      About
    </button>
  );
};

export default About;