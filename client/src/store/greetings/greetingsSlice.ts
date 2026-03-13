import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { IGreetingResponse } from "@/common/types";

import { fetchGreetings, sendGreeting } from "./greetingsThunks";

interface IGreetingsState {
  items: IGreetingResponse[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
}

const initialState: IGreetingsState = {
  items: [],
  isLoading: false,
  isSending: false,
  error: null,
};

const greetingsSlice = createSlice({
  name: "greetings",
  initialState,
  reducers: {
    addGreetingLocally(state, action: PayloadAction<IGreetingResponse>) {
      state.items.push(action.payload);
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreetings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGreetings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchGreetings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(sendGreeting.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(sendGreeting.fulfilled, (state, action) => {
        state.isSending = false;
        state.items.push(action.payload);
      })
      .addCase(sendGreeting.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload as string;
      });
  },
});

export const { addGreetingLocally, clearError } = greetingsSlice.actions;
export default greetingsSlice.reducer;
