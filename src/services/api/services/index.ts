import {
  ApiResponse,
  Service,
  CalendarSlot,
} from '../../../types';
import { StorageService } from '../../../utils/storage';
import {
  mockServices,
  mockCalendarSlots,
} from '../../../utils/mockData';

const BASE_URL = 'https://e7gezly-1054846845303.us-central1.run.app/api';

class ServicesApiService {
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
      console.error('Services API Error:', error);
      throw error;
    }
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getServices(
    demoMode: boolean = false,
  ): Promise<ApiResponse<Service[]>> {
    if (demoMode) {
      await this.delay(600); // Simulate network delay
      return mockServices;
    }
    const token = await StorageService.getToken();
    return this.request<Service[]>(
      "/v1/clientService/services",
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async getCalendarSetup(
    serviceId: number,
    demoMode: boolean = false,
  ): Promise<ApiResponse<CalendarSlot[]>> {
    if (demoMode) {
      await this.delay(700); // Simulate network delay
      return mockCalendarSlots;
    }
    const token = await StorageService.getToken();
    return this.request<CalendarSlot[]>(
      `/v1/bookingRequests/calendar/setup?serviceId=${serviceId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}

export default new ServicesApiService();

