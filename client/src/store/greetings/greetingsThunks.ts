import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IGreeting, IGreetingResponse } from "@/common/types";

import { GreetingsService } from "@/api/services/GreetingsService";

export const fetchGreetings = createAsyncThunk(
  "greetings/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await GreetingsService.getGreetings();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return [];
      }
      return rejectWithValue("Не вдалося завантажити побажання");
    }
  },
);

export const sendGreeting = createAsyncThunk(
  "greetings/send",
  async (payload: IGreeting, { rejectWithValue }) => {
    try {
      const response = await GreetingsService.sendGreeting(payload);
      return response.data.Greeting as IGreetingResponse;
    } catch {
      return rejectWithValue("Не вдалося надіслати побажання");
    }
  },
);
