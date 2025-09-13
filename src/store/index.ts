import { configureStore } from "@reduxjs/toolkit";
import spritesReducer from "./spritesSlice";

export const store = configureStore({
  reducer: {
    sprites: spritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
