// API Response Types
export interface ApiResponse<T> {
  responseCode: number;
  responseMessage: string;
  responseMessageAr: string;
  data: T;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  id: number;
  token: string;
}

// Service Types
export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Service {
  clientServiceId: number;
  serviceName: LocalizedText;
  serviceStatus: number;
  serviceFees: number;
  info: string;
  details: string;
  logo?: string; // Image URL or base64
}

// Calendar Types
export interface CalendarSlot {
  day: string; // YYYY-MM-DD format
  hour: string; // HH:mm format
  remainingRequests: number;
  type: LocalizedText;
  dayName: string;
}

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Calendar: { 
   service: Service,
  };
  ComingSoon: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Services: undefined;
  Notifications: undefined;
  Profile: undefined;
};

