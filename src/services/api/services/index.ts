import {
  ApiResponse,
  Service,
  CalendarSlot,
} from '../../../types';
import { StorageService } from '../../../utils/storage';

const BASE_URL = 'https://e7gezly-1054846845303.us-central1.run.app/api/v1';

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

  async getServices(
    serviceTypeId: number = 3,
    clientId: number = 166,
  ): Promise<ApiResponse<Service[]>> {
    const token = await StorageService.getToken();
    return this.request<Service[]>(
      `/clientService/services?serviceTypeId=${serviceTypeId}&clientId=${clientId}`,
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
  ): Promise<ApiResponse<CalendarSlot[]>> {
    const token = await StorageService.getToken();
    return this.request<CalendarSlot[]>(
      `/bookingRequests/calendar/setup?serviceId=${serviceId}`,
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

