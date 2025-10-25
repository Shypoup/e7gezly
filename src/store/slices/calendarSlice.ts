import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServicesApi } from '../../services/api';
import { CalendarSlot } from '../../types';

interface CalendarState {
  slots: CalendarSlot[];
  loading: boolean;
  error: string | null;
  message: string | null;
  selectedSlot: CalendarSlot | null;
}

const initialState: CalendarState = {
  slots: [],
  loading: false,
  error: null,
  message: null,
  selectedSlot: null,
};

export const fetchCalendarSetup = createAsyncThunk(
  'calendar/fetchSetup',
  async (
    serviceId: number,
    { rejectWithValue },
  ) => {
    try {
      const response = await ServicesApi.getCalendarSetup(serviceId);
      return {
        data: response.data,
        message: response.responseMessage,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch calendar data');
    }
  },
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    selectSlot: (state, action) => {
      state.selectedSlot = action.payload;
    },
    clearSelectedSlot: (state) => {
      state.selectedSlot = null;
    },
    clearCalendarError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarSetup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchCalendarSetup.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload.data;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(fetchCalendarSetup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.message = null;
      });
  },
});

export const { selectSlot, clearSelectedSlot, clearCalendarError } =
  calendarSlice.actions;
export default calendarSlice.reducer;

