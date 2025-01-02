interface TrackMetadata {
    name: string;
    artist: string;
}

export const getTrackMetadata = (): TrackMetadata => {
    return {
        name: "Name",
        artist: "Artist",
    };
};

export const updateTrackMetadata = (): TrackMetadata => {
    return {
        name: "Name",
        artist: "Artist",
    };
};
