import { Service, CalendarSlot, ApiResponse, LoginData } from '../types';

// Mock Login Data
export const mockLoginData: ApiResponse<LoginData> = {
  responseCode: 200,
  responseMessage: 'User Login Successfully (Demo Mode)',
  responseMessageAr: 'تم تسجيل الدخول بنجاح (وضع التجربة)',
  data: {
    id: 999,
    token: 'demo_token_' + Date.now(),
  },
};

// Mock Services Data
export const mockServices: ApiResponse<Service[]> = {
  responseCode: 200,
  responseMessage: 'SUCCESS GETTING DATA (Demo Mode)',
  responseMessageAr: 'تم عرض البيانات بنجاح (وضع التجربة)',
  data: [
    {
      clientServiceId: 419,
      serviceName: {
        ar: 'عيادة أورام الباطنه',
        en: 'Cancer Clinic',
      },
      serviceStatus: 1,
      serviceFees: 150,
      info: 'Specialized oncology clinic',
      details: 'Complete cancer care and treatment',
      logo: 'https://cdn-icons-png.flaticon.com/128/3209/3209265.png',
    },
    {
      clientServiceId: 420,
      serviceName: {
        ar: 'عيادة القلب',
        en: 'Cardiology Clinic',
      },
      serviceStatus: 1,
      serviceFees: 200,
      info: 'Heart health specialists',
      details: 'Comprehensive cardiovascular care',
      logo: 'https://cdn-icons-png.flaticon.com/128/833/833472.png',
    },
    {
      clientServiceId: 421,
      serviceName: {
        ar: 'عيادة الأطفال',
        en: 'Pediatric Clinic',
      },
      serviceStatus: 1,
      serviceFees: 100,
      info: 'Children healthcare',
      details: 'Expert pediatric medical services',
      logo: 'https://cdn-icons-png.flaticon.com/128/2913/2913133.png',
    },
    {
      clientServiceId: 422,
      serviceName: {
        ar: 'عيادة الأسنان',
        en: 'Dental Clinic',
      },
      serviceStatus: 1,
      serviceFees: 120,
      info: 'Complete dental care',
      details: 'Modern dental treatments and procedures',
      logo: 'https://cdn-icons-png.flaticon.com/128/2913/2913133.png',
    },
    {
      clientServiceId: 423,
      serviceName: {
        ar: 'عيادة العيون',
        en: 'Ophthalmology Clinic',
      },
      serviceStatus: 1,
      serviceFees: 180,
      info: 'Eye care specialists',
      details: 'Advanced eye treatments and surgery',
      logo: 'https://cdn-icons-png.flaticon.com/128/2913/2913133.png',
    },
    {
      clientServiceId: 424,
      serviceName: {
        ar: 'عيادة العظام',
        en: 'Orthopedic Clinic',
      },
      serviceStatus: 1,
      serviceFees: 250,
      info: 'Bone and joint specialists',
      details: 'Expert orthopedic care and surgery',
      logo: 'https://cdn-icons-png.flaticon.com/128/1995/1995515.png',
    },
  ],
};

// Mock Calendar Data
export const mockCalendarSlots: ApiResponse<CalendarSlot[]> = {
  responseCode: 200,
  responseMessage: 'SUCCESS GETTING DATA (Demo Mode)',
  responseMessageAr: 'تم عرض البيانات بنجاح (وضع التجربة)',
  data: [
    // Today
    {
      day: new Date().toISOString().split('T')[0],
      hour: '08:00',
      remainingRequests: 5,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'today',
    },
    {
      day: new Date().toISOString().split('T')[0],
      hour: '09:00',
      remainingRequests: 3,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'today',
    },
    {
      day: new Date().toISOString().split('T')[0],
      hour: '10:00',
      remainingRequests: 0,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'today',
    },
    {
      day: new Date().toISOString().split('T')[0],
      hour: '14:00',
      remainingRequests: 4,
      type: {
        ar: 'مسائي',
        en: 'Evening shift',
      },
      dayName: 'today',
    },
    // Tomorrow
    {
      day: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      hour: '08:00',
      remainingRequests: 6,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'tomorrow',
    },
    {
      day: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      hour: '09:00',
      remainingRequests: 5,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'tomorrow',
    },
    {
      day: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      hour: '10:00',
      remainingRequests: 4,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'tomorrow',
    },
    {
      day: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      hour: '11:00',
      remainingRequests: 3,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'tomorrow',
    },
    {
      day: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      hour: '14:00',
      remainingRequests: 5,
      type: {
        ar: 'مسائي',
        en: 'Evening shift',
      },
      dayName: 'tomorrow',
    },
    {
      day: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      hour: '15:00',
      remainingRequests: 4,
      type: {
        ar: 'مسائي',
        en: 'Evening shift',
      },
      dayName: 'tomorrow',
    },
    // Day after tomorrow
    {
      day: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      hour: '08:00',
      remainingRequests: 7,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'day after tomorrow',
    },
    {
      day: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      hour: '09:00',
      remainingRequests: 6,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'day after tomorrow',
    },
    {
      day: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      hour: '10:00',
      remainingRequests: 5,
      type: {
        ar: 'صباحي',
        en: 'Morning shift',
      },
      dayName: 'day after tomorrow',
    },
    {
      day: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      hour: '14:00',
      remainingRequests: 6,
      type: {
        ar: 'مسائي',
        en: 'Evening shift',
      },
      dayName: 'day after tomorrow',
    },
    {
      day: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      hour: '15:00',
      remainingRequests: 5,
      type: {
        ar: 'مسائي',
        en: 'Evening shift',
      },
      dayName: 'day after tomorrow',
    },
    {
      day: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      hour: '16:00',
      remainingRequests: 4,
      type: {
        ar: 'مسائي',
        en: 'Evening shift',
      },
      dayName: 'day after tomorrow',
    },
  ],
};

