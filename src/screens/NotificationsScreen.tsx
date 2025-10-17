import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../constants/colors';

const NotificationsScreen: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: 'Appointment Reminder',
      message: 'Your appointment is scheduled for tomorrow at 10:00 AM',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Booking Confirmed',
      message: 'Your booking for Cancer Clinic has been confirmed',
      time: '1 day ago',
      unread: true,
    },
    {
      id: 3,
      title: 'New Service Available',
      message: 'Check out our new Dental Clinic service',
      time: '2 days ago',
      unread: false,
    },
    {
      id: 4,
      title: 'Payment Successful',
      message: 'Payment of $150 has been processed successfully',
      time: '3 days ago',
      unread: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              notification.unread && styles.notificationUnread,
            ]}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>
                {notification.title}
              </Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
            <Text style={styles.notificationMessage}>
              {notification.message}
            </Text>
            {notification.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  markAllRead: {
    fontSize: 14,
    color: colors.info,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  notificationCard: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  notificationUnread: {
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.info,
  },
});

export default NotificationsScreen;

