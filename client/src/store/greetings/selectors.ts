import type { RootState } from "../store";

export const selectGreetings = (state: RootState) => state.greetings.items;
export const selectIsLoading = (state: RootState) => state.greetings.isLoading;
export const selectIsSending = (state: RootState) => state.greetings.isSending;
export const selectGreetingsError = (state: RootState) => state.greetings.error;
