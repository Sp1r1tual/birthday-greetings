import { configureStore } from "@reduxjs/toolkit";
import greetingsReducer from "./greetings/greetingsSlice";

export const store = configureStore({
  reducer: {
    greetings: greetingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
