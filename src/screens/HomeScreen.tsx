import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, BottomTabParamList } from '../types';
import { colors } from '../constants/colors';

type HomeScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'Home'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const navigateToServices = () => {
    navigation.navigate('Services');
  };

  const navigateToComingSoon = () => {
    navigation.navigate('ComingSoon');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      

        {/* Key Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Benefits</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Icon name="calendar-outline" size={20} color={colors.primary} />
              <Text style={styles.benefitText}>
                <Text style={styles.benefitBold}>Easy Booking:</Text> Schedule
                appointments effortlessly.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon name="shield-checkmark-outline" size={20} color={colors.primary} />
              <Text style={styles.benefitText}>
                <Text style={styles.benefitBold}>Secure Login:</Text> Your data
                is always protected.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Icon name="grid-outline" size={20} color={colors.primary} />
              <Text style={styles.benefitText}>
                <Text style={styles.benefitBold}>Diverse Services:</Text>{' '}
                Explore a wide range of options.
              </Text>
            </View>
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Login/Register</Text>
                <Text style={styles.stepDescription}>
                  Securely access your account or create a new one.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Browse Services</Text>
                <Text style={styles.stepDescription}>
                  Explore a variety of services, categories, and providers.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Book an Appointment</Text>
                <Text style={styles.stepDescription}>
                  Choose a time, confirm details, and you're all set!
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={navigateToServices}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        {/* Popular Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity onPress={navigateToServices}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servicesList}>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={navigateToServices}
            >
              <View style={styles.serviceIconContainer}>
                <Icon name="calendar-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.serviceText}>Book Appointment</Text>
              <Icon name="chevron-forward" size={20} color={colors.chevronIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem} onPress={navigateToComingSoon}>
              <View style={styles.serviceIconContainer}>
                <Icon name="grid-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.serviceText}>Browse Categories</Text>
              <Icon name="chevron-forward" size={20} color={colors.chevronIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem} onPress={navigateToComingSoon}>
              <View style={styles.serviceIconContainer}>
                <Icon name="search-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.serviceText}>Find Professionals</Text>
              <Icon name="chevron-forward" size={20} color={colors.chevronIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Recent Activity</Text>
          <View style={styles.activityList}>
            <TouchableOpacity style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Icon name="calendar-outline" size={20} color={colors.menuIcon} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  Appointment confirmed with Dr. E
                </Text>
                <Text style={styles.activitySubtitle}>
                  Your dental check-up is scheduled for...
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.chevronIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Icon name="card-outline" size={20} color={colors.menuIcon} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  Payment processed for Massage
                </Text>
                <Text style={styles.activitySubtitle}>
                  Successfully paid for your session on...
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.chevronIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 10,
  },
  header: {
    backgroundColor: colors.backgroundSecondary,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
  },
  notificationButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  welcomeCard: {
    backgroundColor: colors.primaryLight,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    flex: 1,
  },
  benefitBold: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  getStartedButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  servicesList: {
    gap: 12,
  },
  serviceItem: {
    backgroundColor: colors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.iconBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    backgroundColor: colors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 12,
    color: colors.textTertiary,
  },
});

export default HomeScreen;
