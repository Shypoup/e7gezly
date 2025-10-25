import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServicesApi } from '../../services/api';
import { Service } from '../../types';

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async ({ serviceTypeId = 3, clientId = 166 }: { serviceTypeId?: number; clientId?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await ServicesApi.getServices(serviceTypeId, clientId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch services');
    }
  },
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearServicesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearServicesError } = servicesSlice.actions;
export default servicesSlice.reducer;

