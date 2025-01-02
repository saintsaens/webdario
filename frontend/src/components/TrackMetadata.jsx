import React, { useState, useEffect } from 'react';

const TrackMetadata = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/metadata');
        const data = await response.json();
        console.log(data);
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, []);

  if (!metadata) return <div>Loading...</div>;

  return (
    <div className="track-metadata">
      <div>Title: {metadata.name || 'Unknown'}</div>
      <div>Artist: {metadata.artist || 'Unknown'}</div>
    </div>
  );
};

export default TrackMetadata;
