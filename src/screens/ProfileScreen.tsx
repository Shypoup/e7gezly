import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, BottomTabParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { colors } from '../constants/colors';

type ProfileScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { demoMode } = useAppSelector((state) => state.auth);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    dispatch(logout());
    Toast.show({
      type: 'info',
      text1: 'Logged Out',
      text2: 'You have been successfully logged out',
      position: 'top',
      visibilityTime: 2000,
    });
  };

  const navigateToComingSoon = () => {
    navigation.navigate('ComingSoon');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Icon name="person" size={40} color="#1a73e8" />
          </View>
          <Text style={styles.userName}>Demo User</Text>
          <Text style={styles.userEmail}>customer@gmail.com</Text>
          {demoMode && (
            <View style={styles.demoModeBadge}>
              <Icon name="flag" size={14} color="#856404" style={styles.demoModeIcon} />
              <Text style={styles.demoModeText}>Demo Mode</Text>
            </View>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.menuItem} onPress={navigateToComingSoon}>
            <Icon name="person-outline" size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Icon name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToComingSoon}>
            <Icon name="lock-closed-outline" size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>Change Password</Text>
            <Icon name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToComingSoon}>
            <Icon name="phone-portrait-outline" size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>Manage Devices</Text>
            <Icon name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity style={styles.menuItem} onPress={navigateToComingSoon}>
            <Icon name="notifications-outline" size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>Notifications</Text>
            <Icon name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToComingSoon}>
            <Icon name="moon-outline" size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>Dark Mode</Text>
            <Icon name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToComingSoon}>
            <Icon name="globe-outline" size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>Language</Text>
            <Icon name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.menuItem} onPress={navigateToComingSoon}>
            <Icon name="help-circle-outline" size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>Help Center</Text>
            <Icon name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToComingSoon}>
            <Icon name="call-outline" size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>Contact Us</Text>
            <Icon name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToComingSoon}>
            <Icon name="star-outline" size={24} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuText}>Rate App</Text>
            <Icon name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.menuItem,styles.logoutButton]} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color={colors.error} style={styles.menuIcon} />
          <Text style={styles.logoutText}>Logout</Text>
         
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setLogoutModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalIcon}>
              <Icon name="log-out-outline" size={48} color={colors.error} />
            </View>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmLogoutButton]}
                onPress={confirmLogout}>
                <Text style={styles.confirmLogoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.cardBackground,
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.infoLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  demoModeBadge: {
    backgroundColor: colors.demoBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.demoBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  demoModeIcon: {
    marginRight: 6,
  },
  demoModeText: {
    fontSize: 12,
    color: colors.demoText,
    fontWeight: '600',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textTertiary,
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  menuItem: {
    backgroundColor: colors.backgroundWhite,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  logoutButton: {
    backgroundColor: colors.backgroundWhite,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  
   
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.error,
  },
  version: {
    textAlign: 'center',
    color: colors.textTertiary,
    fontSize: 12,
    marginBottom: 32,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.backgroundGray,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  confirmLogoutButton: {
    backgroundColor: colors.error,
  },
  confirmLogoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
  },
});

export default ProfileScreen;

