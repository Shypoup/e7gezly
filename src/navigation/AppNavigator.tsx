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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(checkAuthStatus());
      // Brief delay to ensure smooth transition from native splash
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={isAuthenticated ? 'MainTabs' : 'Login'}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

