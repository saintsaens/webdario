import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from "./features/audioPlayerSlice";
import channelSwitcherReducer from "./features/channelSwitcherSlice"

const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    channelSwitcher: channelSwitcherReducer,
  },
});

export default store;
