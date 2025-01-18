import { createSlice } from "@reduxjs/toolkit";

const audioPlayerSlice = createSlice({
    name: "audioPlayer",
    initialState: {
        isMuted: true,
        playlistDuration: 5801,
    },
    reducers: {
        setMuted(state, action) {
            state.isMuted = action.payload;
        },
        setPlaylistDuration(state, action) {
            state.startTime = action.payload;
        }
    },
});

export const { setMuted, setPlaylistDuration } = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
