import React, { useState, useEffect } from 'react';

const backend_url = import.meta.env.VITE_BACKEND_URL;

const TrackMetadata = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(`${backend_url}/metadata`);
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