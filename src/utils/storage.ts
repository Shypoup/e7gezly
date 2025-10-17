import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@e7gezly_token';
const DEMO_MODE_KEY = '@e7gezly_demo_mode';

export const StorageService = {
  saveToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  removeToken: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
      throw error;
    }
  },

  saveDemoMode: async (enabled: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(DEMO_MODE_KEY, JSON.stringify(enabled));
    } catch (error) {
      console.error('Error saving demo mode:', error);
      throw error;
    }
  },

  getDemoMode: async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(DEMO_MODE_KEY);
      return value ? JSON.parse(value) : false;
    } catch (error) {
      console.error('Error getting demo mode:', error);
      return false;
    }
  },

  removeDemoMode: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(DEMO_MODE_KEY);
    } catch (error) {
      console.error('Error removing demo mode:', error);
      throw error;
    }
  },
};

