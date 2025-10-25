import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuthStatus } from '../store/slices/authSlice';
import LoginScreen from '../screens/LoginScreen';
import BottomTabsNavigator from './BottomTabsNavigator';
import CalendarScreen from '../screens/CalendarScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthStatus());
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        // Brief delay to ensure smooth transition
        setTimeout(() => {
          setIsCheckingAuth(false);
        }, 300);
      }
    };
    checkAuth();
  }, [dispatch]);

  // Show splash screen while checking authentication
  if (isCheckingAuth) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none', // Disable animation on initial load
        }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

