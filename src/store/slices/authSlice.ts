import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from '../../services/api';
import { StorageService } from '../../utils/storage';
import { LoginRequest } from '../../types';

interface AuthState {
  token: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  demoMode: boolean;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  demoMode: false,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (
    payload: { credentials: LoginRequest; demoMode: boolean },
    { rejectWithValue },
  ) => {
    try {
      const { credentials, demoMode } = payload;
      const response = await AuthApi.login(credentials, demoMode);
      const { token, id } = response.data;
      await StorageService.saveToken(token);
      await StorageService.saveDemoMode(demoMode);
      return { token, userId: id, demoMode };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.responseMessage || 'Something went wrong please try again later');
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await StorageService.removeToken();
  await StorageService.removeDemoMode();
});

export const checkAuthStatus = createAsyncThunk('auth/checkStatus', async () => {
  const token = await StorageService.getToken();
  const demoMode = await StorageService.getDemoMode();
  return { token, demoMode };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setDemoMode: (state, action) => {
      state.demoMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.demoMode = action.payload.demoMode;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Something went wrong please try again later';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.userId = null;
        state.isAuthenticated = false;
        state.demoMode = false;
      })
      // Check auth status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.token = action.payload.token;
          state.demoMode = action.payload.demoMode;
          state.isAuthenticated = true;
        }
      });
  },
});

export const { clearError, setDemoMode } = authSlice.actions;
export default authSlice.reducer;

