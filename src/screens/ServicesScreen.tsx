import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, BottomTabParamList, Service } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchServices } from '../store/slices/servicesSlice';
import ErrorMessage from '../components/ErrorMessage';
import ServicesSkeleton from '../components/ServicesSkeleton';
import { colors } from '../constants/colors';



type ServicesScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'Services'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

const ServicesScreen: React.FC<ServicesScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { services, loading, error } = useAppSelector(
    (state) => state.services,
  );
  // Demo mode is used to show the demo services
  const { demoMode } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchServices(demoMode));
  }, [dispatch, demoMode]);
  // Handle refresh is used to refresh the services
  const handleRefresh = () => {
    dispatch(fetchServices(demoMode));
  };
  // Handle service press is used to navigate to the calendar screen
  const handleServicePress = (service: Service) => {
    navigation.navigate('Calendar', {
      service,
    });
  };

  const getIconBackground = (index: number) => {
    const iconColors = [colors.iconBg1, colors.iconBg2, colors.iconBg3, colors.iconBg4, colors.iconBg5];
    return iconColors[index % iconColors.length];
  };

  const renderServiceItem = ({ item, index }: { item: Service; index: number }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleServicePress(item)}
      activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: getIconBackground(index) }]}>
          {item.logo ? (
            <FastImage
              source={{ 
                uri: item.logo,
                priority: FastImage.priority.high,
              }}
              style={styles.iconImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <Icon name="medical" size={40} color="#5B4D9D" />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.serviceName}>{item.serviceName.en}</Text>
          <Text style={styles.serviceNameAr}>{item.serviceName.ar}</Text>
          <View style={styles.statusRow}>
            <Text
              style={[
                styles.statusText,
                item.serviceStatus === 1 ? styles.statusAvailable : styles.statusBusy,
              ]}>
              {item.serviceStatus === 1 ? 'Available' : 'Busy'}
            </Text>
            {item.serviceFees > 0 ? (
              <Text style={styles.fees}>${item.serviceFees}</Text>
            ) : (
              <Text style={styles.freeText}>Free</Text>
            )}
          </View>
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && services.length === 0) {
    return <ServicesSkeleton />;
  }

  if (error && services.length === 0) {
    return <ErrorMessage message={error} onRetry={handleRefresh} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
     

      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.clientServiceId.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No services available</Text>
          </View>
        }
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  notificationButton: {
    padding: 8,
  },
  demoModeBanner: {
    backgroundColor: colors.demoBackground,
    padding: 12,
    alignItems: 'center',
  },
  demoModeText: {
    fontSize: 12,
    color: colors.demoText,
    fontWeight: '600',
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  serviceNameAr: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusAvailable: {
    color: colors.statusAvailable,
  },
  statusBusy: {
    color: colors.statusBusy,
  },
  fees: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  freeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  chevron: {
    fontSize: 32,
    color: colors.border,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default ServicesScreen;

