import {
  ApiResponse,
  LoginRequest,
  LoginData,
} from '../../../types';
import { mockLoginData } from '../../../utils/mockData';

const BASE_URL = 'https://e7gezly-1054846845303.us-central1.run.app/api';

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

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(
    credentials: LoginRequest,
    demoMode: boolean = false,
  ): Promise<ApiResponse<LoginData>> {
    if (demoMode) {
      await this.delay(800); // Simulate network delay
      return mockLoginData;
    }
    return this.request<LoginData>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
}

export default new AuthApiService();

