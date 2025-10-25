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

export interface CustomerResponse {
  customerId: number;
  customerCivilId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerGender: string;
  customerAddress: string | null;
  customerType: string | null;
  createdBy: number;
  createdDate: string;
  updatedBy: number;
  updatedDate: string;
}

export interface LoginData {
  id: number;
  role: string;
  roleId: number;
  token: string;
  refreshToken: string;
  username: string;
  customerResponse: CustomerResponse;
  defaultClientId: number | null;
  defaultBranchId: number | null;
  defaultClientName: string | null;
  defaultBranchName: string | null;
  defaultDisplayName: string | null;
  defaultClientUserRoleId: number | null;
  connectedClientUsersToLoginUserDTOList: any | null;
}

// Service Types
export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Client {
  clientId: number;
  clientName: LocalizedText;
}

export interface Branch {
  branchId: number;
  branchName: LocalizedText;
  clientId: number;
  branchLocCode: string;
  branchAddress: string;
  branchPostalCode: string;
  branchEmail: string;
  branchPhone: string;
  branchStatus: number;
  futureBookPeriod: number;
  reservationChannelId: number;
  reservationsGap: number;
  createdBy: number;
  createdDate: string;
  lastUpdatedBy: number;
  lastUpdatedDate: string;
}

export interface ServiceType {
  serviceId: number;
  serviceName: LocalizedText;
  parentServiceId: number | null;
  createdBy: number;
  createdDate: string;
  updatedBy: number | null;
  updatedDate: string;
}

export interface ServiceTypesCategory {
  id: number;
  besReservationDescription: LocalizedText;
}

export interface ScheduleType {
  id: number;
  besScheduleTypeDesc: LocalizedText;
}

export interface ReservationOption {
  id: number;
  besReservationOptionDesc: LocalizedText;
}

export interface ReservationTypes {
  id: number;
  description: LocalizedText;
}

export interface ClientServiceImage {
  imageId: number;
  image: string;
  clientServiceId: number;
}

export interface ServiceCategory {
  categoryId: number;
  categoryName: LocalizedText;
  categoryCanRepeat: boolean;
  categoryRepeatInterval: number;
}

export interface ServiceRuleParam {
  // Add fields as needed based on actual data
}

export interface ClientServiceRule {
  serviceRuleId: number;
  clientServiceId: number;
  serviceRuleName: string;
  createdBy: number;
  createdDate: string;
  updatedBy: number | null;
  updatedDate: string;
  ruleTypeId: number;
  besServiceRulesParamsList: ServiceRuleParam[];
}

export interface Service {
  clientServiceId: number;
  client: Client;
  branch: Branch;
  service: ServiceType;
  serviceTypes: ServiceTypesCategory;
  scheduleType: ScheduleType;
  reservationOption: ReservationOption;
  reservationTypes: ReservationTypes;
  clientServiceParentId: number | null;
  clientServiceParentName: LocalizedText | null;
  serviceCode: string | null;
  serviceName: LocalizedText;
  serviceStatus: number;
  serviceFees: number;
  paymentTypeId: number | null;
  futureBookPeriod: number;
  reservationsGap: number;
  reservationsChannelId: number;
  info: string;
  details: string;
  logo: string;
  createdBy: number;
  createdDate: string;
  updatedBy: number;
  updatedDate: string;
  vacationTypeList: any | null;
  externalOrgClients: any[];
  clientRules: any[];
  notifications: any[];
  clientServiceImagesList: ClientServiceImage[];
  serviceCategory: ServiceCategory;
  serviceCanRepeat: boolean | null;
  serviceRepeatInterval: number | null;
  clientServiceRules: ClientServiceRule[];
}

// Calendar Types
export interface StatusDTO {
  id: number;
  description: LocalizedText;
  statusId: number | null;
  status: any | null;
}

export interface CalendarSlot {
  day: string; // YYYY-MM-DD format
  hour: string; // HH:mm format
  customerStatus: LocalizedText;
  remainingRequests: number;
  type: LocalizedText;
  statusDTO: StatusDTO;
  dayName: string;
  totalBookedCount: number;
  serviceId: number | null;
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

