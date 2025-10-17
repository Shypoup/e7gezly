// Theme Colors
export const colors = {
  // Primary Colors
  primary: '#4C6FFF',
  primaryLight: '#E8EEFF',
  primaryDark: '#3A5AE6',

  // Background Colors
  background: '#F5F7FA',
  backgroundWhite: '#fff',
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

  // Demo Mode Colors
  demoBackground: '#fff3cd',
  demoBorder: '#ffc107',
  demoText: '#856404',

  // Icon Background Colors (for Services)
  iconBg1: '#E3F2FD', // Light Blue
  iconBg2: '#E8F5E9', // Light Green
  iconBg3: '#F3E5F5', // Light Purple
  iconBg4: '#FFF3E0', // Light Orange
  iconBg5: '#FCE4EC', // Light Pink

  // Gradient Colors
  gradientStart: '#4C6FFF',
  gradientEnd: '#3A5AE6',
} as const;

export type Colors = typeof colors;

