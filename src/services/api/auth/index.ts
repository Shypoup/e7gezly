import {
  ApiResponse,
  LoginRequest,
  LoginData,
} from '../../../types';

const BASE_URL = 'https://e7gezly-1054846845303.us-central1.run.app/api/v1';

class AuthApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.responseMessage || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('Auth API Error:', error);
      throw error;
    }
  }

  async login(
    credentials: LoginRequest,
  ): Promise<ApiResponse<LoginData>> {
    return this.request<LoginData>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
}

export default new AuthApiService();

