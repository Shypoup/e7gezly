import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, CalendarSlot } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCalendarSetup, selectSlot } from '../store/slices/calendarSlice';
import ErrorMessage from '../components/ErrorMessage';
import CalendarSkeleton from '../components/CalendarSkeleton';
import { colors } from '../constants/colors';

type CalendarScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Calendar'>;
  route: RouteProp<RootStackParamList, 'Calendar'>;
};

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation, route }) => {
  const { service } = route.params;
  const dispatch = useAppDispatch();
  const { slots, loading, error, message } = useAppSelector(
    (state) => state.calendar,
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<CalendarSlot | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Get the image from clientServiceImagesList or fallback to logo field
  const serviceImageUrl = service.clientServiceImagesList?.[0]?.image || service.logo;

  useEffect(() => {
    dispatch(fetchCalendarSetup(service?.clientServiceId));
  }, [dispatch, service?.clientServiceId]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchCalendarSetup(service?.clientServiceId));
  }, [dispatch, service?.clientServiceId]);

  // Memoize grouped slots calculation to prevent unnecessary re-renders
  const groupedSlots = useMemo(() => {
    const grouped: { [key: string]: CalendarSlot[] } = {};
    slots.forEach((slot) => {
      if (!grouped[slot.day]) {
        grouped[slot.day] = [];
      }
      grouped[slot.day].push(slot);
    });
    return grouped;
  }, [slots]);

  const dates = useMemo(() => Object.keys(groupedSlots).sort(), [groupedSlots]);

  const handleDatePress = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  // Memoized render function for date items
  const renderDateItem = useCallback(({ item: date }: { item: string }) => {
    const dateObj = new Date(date);
    const dayName = dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
    });
    const dayNumber = dateObj.getDate();
    const isSelected = selectedDate === date;

    return (
      <TouchableOpacity
        style={[
          styles.dateCard,
          isSelected && styles.dateCardSelected,
        ]}
        onPress={() => handleDatePress(date)}>
        <Text
          style={[
            styles.dayName,
            isSelected && styles.dateTextSelected,
          ]}>
          {dayName}
        </Text>
        <Text
          style={[
            styles.dayNumber,
            isSelected && styles.dateTextSelected,
          ]}>
          {dayNumber}
        </Text>
      </TouchableOpacity>
    );
  }, [selectedDate, handleDatePress]);

  const handleSlotPress = useCallback((slot: CalendarSlot) => {
    dispatch(selectSlot(slot));
    setSelectedSlotForBooking(slot);
    setModalVisible(true);
    setBookingSuccess(false);
  }, [dispatch]);

  // Memoized render function for time slot items
  const renderTimeSlotItem = useCallback(({ item: slot }: { item: CalendarSlot }) => {
    const isAvailable = slot.remainingRequests > 0;
    const slotsColor = slot.remainingRequests <= 3 ? colors.timeSlotLimited : colors.timeSlotText;

    return (
      <TouchableOpacity
        style={[
          styles.timeSlotCard,
          !isAvailable && styles.timeSlotDisabled,
        ]}
        onPress={() => {
          if (isAvailable) {
            handleSlotPress(slot);
          }
        }}
        disabled={!isAvailable}
        activeOpacity={isAvailable ? 0.7 : 1}>
        <Text style={styles.slotTime}>{slot.hour}</Text>
        <Text style={[styles.slotsLeft, { color: slotsColor }]}>
          {slot.remainingRequests} slots left
        </Text>
      </TouchableOpacity>
    );
  }, [handleSlotPress]);

  const handleConfirmBooking = useCallback(() => {
    // Here you would call your booking API
    setBookingSuccess(true);
    // Close modal after 2 seconds
    setTimeout(() => {
      setModalVisible(false);
      setBookingSuccess(false);
      setSelectedSlotForBooking(null);
    }, 2000);
  }, []);

  const handleCancelBooking = useCallback(() => {
    setModalVisible(false);
    setSelectedSlotForBooking(null);
    setBookingSuccess(false);
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // Memoize displayed slots to prevent unnecessary recalculation
  const displayedSlots = useMemo(() => {
    return selectedDate ? groupedSlots[selectedDate] || [] : [];
  }, [selectedDate, groupedSlots]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={[colors.info]}
            tintColor={colors.info}
          />
        }>
        {/* Service Image */}
        {serviceImageUrl ? (
          <FastImage
            source={{ 
              uri: serviceImageUrl,
              priority: FastImage.priority.high,
            }}
            style={[styles.serviceImage, styles.placeholderImage]}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <View style={[styles.serviceImage, styles.placeholderImage]}>
            <Icon name="medical" size={100} color={colors.primary} />
          </View>
        )}

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{service.serviceName.en}</Text>
          <Text style={styles.serviceDescription}>{service.details}</Text>
        </View>

        {/* Loading State */}
        {loading && slots.length === 0 && (
          <View style={styles.loadingContainer}>
            <Icon name="calendar-outline" size={80} color={colors.calendarIcon} />
            <Text style={styles.loadingTitle}>Loading Available Slots...</Text>
            <Text style={styles.loadingMessage}>Please wait while we fetch the available time slots</Text>
          </View>
        )}

        {/* Error State */}
        {error && slots.length === 0 && !loading && (
          <View style={styles.noSlotsContainer}>
            <Icon name="alert-circle-outline" size={80} color={colors.danger} />
            <Text style={styles.noSlotsTitle}>Error Loading Slots</Text>
            <Text style={styles.noSlotsMessage}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Icon name="refresh" size={20} color={colors.textWhite} />
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* No Slots Available Message */}
        {!loading && !error && slots.length === 0 && (
          <View style={styles.noSlotsContainer}>
            <Icon name="calendar-outline" size={80} color={colors.calendarIcon} />
            <Text style={styles.noSlotsTitle}>No Available Slots</Text>
            {message && (
              <Text style={styles.noSlotsMessage}>{message}</Text>
            )}
          </View>
        )}

        {/* Date Selection */}
        {dates.length > 0 && (
          <View style={styles.section}>
            <FlatList
              horizontal
              data={dates}
              keyExtractor={(item) => item}
              renderItem={renderDateItem}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.datesContainer}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews={true}
            />
          </View>
        )}

        {/* Time Slots */}
        {selectedDate && displayedSlots.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            <FlatList
              data={displayedSlots}
              keyExtractor={(item, index) => `${item.day}-${item.hour}-${index}`}
              renderItem={renderTimeSlotItem}
              numColumns={2}
              columnWrapperStyle={styles.slotsRow}
              scrollEnabled={false}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews={true}
            />
          </View>
        )}

        {!selectedDate && dates.length > 0 && (
          <View style={styles.emptyState}>
            <Icon name="calendar-outline" size={64} color={colors.calendarIcon} />
            <Text style={styles.emptyStateText}>
              Please select a date to view available time slots
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Booking Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelBooking}>
        <Pressable style={styles.modalOverlay} onPress={handleCancelBooking}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            {!bookingSuccess ? (
              <>
                <View style={styles.modalHeader}>
                  <Icon name="calendar" size={48} color={colors.modalIcon} />
                  <Text style={styles.modalTitle}>Booking Confirmation</Text>
                </View>

                {selectedSlotForBooking && (
                  <View style={styles.modalBody}>
                    <View style={styles.bookingDetail}>
                      <Icon name="person-outline" size={24} color={colors.bookingIcon} />
                      <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Service</Text>
                        <Text style={styles.detailValue}>{service.serviceName.en}</Text>
                      </View>
                    </View>

                    <View style={styles.bookingDetail}>
                      <Icon name="calendar-outline" size={24} color={colors.bookingIcon} />
                      <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Date</Text>
                        <Text style={styles.detailValue}>
                          {formatDate(selectedSlotForBooking.day)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.bookingDetail}>
                      <Icon name="time-outline" size={24} color={colors.bookingIcon} />
                      <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Time</Text>
                        <Text style={styles.detailValue}>{selectedSlotForBooking.hour}</Text>
                      </View>
                    </View>

                    <View style={styles.bookingDetail}>
                      <Icon name="sunny-outline" size={24} color={colors.bookingIcon} />
                      <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Shift</Text>
                        <Text style={styles.detailValue}>{selectedSlotForBooking.type.en}</Text>
                      </View>
                    </View>

                    <View style={styles.bookingDetail}>
                      <Icon name="people-outline" size={24} color={colors.bookingIcon} />
                      <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Available Slots</Text>
                        <Text style={styles.detailValue}>
                          {selectedSlotForBooking.remainingRequests} slots remaining
                        </Text>
                      </View>
                    </View>

                    {service.serviceFees > 0 && (
                      <View style={styles.bookingDetail}>
                        <Icon name="cash-outline" size={24} color={colors.priceIcon} />
                        <View style={styles.detailTextContainer}>
                          <Text style={styles.detailLabel}>Price</Text>
                          <Text style={[styles.detailValue, styles.priceText]}>
                            {service.serviceFees} EGP
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                )}

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={handleCancelBooking}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={handleConfirmBooking}>
                    <Text style={styles.confirmButtonText}>Confirm Booking</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.successContainer}>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={handleCancelBooking}>
                  <Icon name="close" size={28} color={colors.textSecondary} />
                </TouchableOpacity>
                <View style={styles.successIconContainer}>
                  <Icon name="checkmark-circle" size={80} color={colors.success} />
                </View>
                <Text style={styles.successTitle}>Booking Successful!</Text>
                <Text style={styles.successMessage}>
                  Your appointment has been confirmed
                </Text>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  serviceImage: {
    width: '100%',
    height: 250,
  },
  placeholderImage: {
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    padding: 20,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  serviceDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  datesContainer: {
    paddingRight: 20,
    gap: 12,
  },
  dateCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.dateCardBorder,
  },
  dateCardSelected: {
    backgroundColor: colors.dateCardSelected,
    borderColor: colors.dateCardSelected,
  },
  dayName: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  dateTextSelected: {
    color: colors.textWhite,
  },
  slotsRow: {
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  timeSlotCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
    flex: 0.48,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  timeSlotDisabled: {
    backgroundColor: colors.backgroundGray,
    opacity: 0.5,
  },
  slotTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  slotsLeft: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginTop: 16,
  },
  noSlotsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  noSlotsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 24,
    marginBottom: 12,
  },
  noSlotsMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 24,
    marginBottom: 12,
  },
  loadingMessage: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.info,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    gap: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 12,
  },
  modalBody: {
    marginBottom: 24,
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  priceText: {
    color: colors.success,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
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
  confirmButton: {
    backgroundColor: colors.info,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
    zIndex: 1,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default CalendarScreen;

