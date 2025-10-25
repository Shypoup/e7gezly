// Theme Colors
export const colors = {
  // Primary Colors
  primary: '#4C6FFF',
  primaryLight: '#E8EEFF',
  primaryDark: '#3A5AE6',

  // Background Colors
  background: '#F5F7FA',
  backgroundSecondary: '#fff',
  backgroundGray: '#F5F5F5',

  // Text Colors
  textPrimary: '#000',
  textSecondary: '#666',
  textTertiary: '#999',
  textWhite: '#fff',

  // Status Colors
  success: '#4CAF50',
  successLight: '#E8F5E9',
  warning: '#FF9800',
  warningLight: '#FFF3E0',
  error: '#f44336',
  errorLight: '#ffebee',
  danger: '#f44336',
  info: '#1a73e8',
  infoLight: '#e3f2fd',

  // Border & Divider Colors
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  divider: '#e0e0e0',

  // Shadow Colors
  shadow: '#000',

  // Specific Component Colors
  cardBackground: '#fff',
  iconBackground: '#E8EEFF',
  disabledBackground: '#a0c4ff',

  // Service Status Colors
  statusAvailable: '#4CAF50',
  statusBusy: '#FF9800',
  statusUnavailable: '#f44336',



  // Icon Background Colors (for Services)
  iconBg1: '#E3F2FD', // Light Blue
  iconBg2: '#E8F5E9', // Light Green
  iconBg3: '#F3E5F5', // Light Purple
  iconBg4: '#FFF3E0', // Light Orange
  iconBg5: '#FCE4EC', // Light Pink

  // Calendar Colors
  calendarIcon: '#ccc',
  dateCardBorder: '#e0e0e0',
  dateCardSelected: '#1a73e8',
  timeSlotAvailable: '#4CAF50',
  timeSlotLimited: '#FF6B6B',
  timeSlotText: '#666',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  modalIcon: '#1a73e8',
  bookingIcon: '#666',
  priceIcon: '#4CAF50',

  // Menu/Navigation Colors
  menuIcon: '#666',
  chevronIcon: '#ccc',
  activeIcon: '#1a73e8',

  // Gradient Colors
  gradientStart: '#4C6FFF',
  gradientEnd: '#3A5AE6',
} as const;

export type Colors = typeof colors;

