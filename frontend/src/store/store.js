import { configureStore } from '@reduxjs/toolkit';
import audoPlayerReducer from "./features/audioPlayerSlice";

const store = configureStore({
  reducer: {
    audioPlayer: audoPlayerReducer,
  },
});

export default store;
