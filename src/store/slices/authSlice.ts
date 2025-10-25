import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from '../../services/api';
import { StorageService } from '../../utils/storage';
import { LoginRequest } from '../../types';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  userId: number | null;
  username: string | null;
  role: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  customerGender: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  userId: null,
  username: null,
  role: null,
  customerName: null,
  customerEmail: null,
  customerPhone: null,
  customerGender: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: LoginRequest,
    { rejectWithValue },
  ) => {
    try {
      const response = await AuthApi.login(credentials);
      const { token, refreshToken, id, username, role, customerResponse } = response.data;
      await StorageService.saveToken(token);
      return { 
        token, 
        refreshToken,
        userId: id,
        username,
        role,
        customerName: customerResponse.customerName,
        customerEmail: customerResponse.customerEmail,
        customerPhone: customerResponse.customerPhone,
        customerGender: customerResponse.customerGender,
      };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.responseMessage || 'Something went wrong please try again later');
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await StorageService.removeToken();
});

export const checkAuthStatus = createAsyncThunk('auth/checkStatus', async () => {
  const token = await StorageService.getToken();
  return { token };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
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
        state.refreshToken = action.payload.refreshToken;
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.role = action.payload.role;
        state.customerName = action.payload.customerName;
        state.customerEmail = action.payload.customerEmail;
        state.customerPhone = action.payload.customerPhone;
        state.customerGender = action.payload.customerGender;
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
        state.refreshToken = null;
        state.userId = null;
        state.username = null;
        state.role = null;
        state.customerName = null;
        state.customerEmail = null;
        state.customerPhone = null;
        state.customerGender = null;
        state.isAuthenticated = false;
      })
      // Check auth status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

