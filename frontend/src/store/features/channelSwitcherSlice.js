import { createSlice } from "@reduxjs/toolkit";

const channelSwitcherSlice = createSlice({
    name: "channelSwitcher",
    initialState: {
        currentChannel: `lofi`,
        selectedIndex: 0,
    },
    reducers: {
        setCurrentChannel(state, action) {
            state.currentChannel = action.payload;
        },
        setSelectedIndex(state, action) {
            state.selectedIndex = action.payload;
        },
    },
});

export const { setCurrentChannel, setSelectedIndex } = channelSwitcherSlice.actions;

export default channelSwitcherSlice.reducer;
