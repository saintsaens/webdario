import { createSlice } from "@reduxjs/toolkit";

const audioPlayerSlice = createSlice({
    name: "audioPlayer",
    initialState: {
        isMuted: true,
    },
    reducers: {
        setMuted(state, action) {
            state.isMuted = action.payload;
        },
    },
});

export const { setMuted } = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
