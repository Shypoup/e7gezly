import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabParamList } from '../types';
import { colors } from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Tab icon components
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home" size={size} color={color} />
);
const ServicesIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="list" size={size} color={color} />
);
const NotificationsIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="notifications" size={size} color={color} />
);
const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="person" size={size} color={color} />
);

const BottomTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.info,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarIcon: ServicesIcon,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: NotificationsIcon,
          tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;

