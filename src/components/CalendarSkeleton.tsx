import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ScrollView } from 'react-native';
import { colors } from '../constants/colors';

const CalendarSkeleton: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backButton} />
        <View style={styles.headerTitle} />
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Service Image Skeleton */}
        <Animated.View style={[styles.serviceImage, { opacity }]} />

        {/* Service Info Skeleton */}
        <View style={styles.serviceInfo}>
          <Animated.View style={[styles.serviceTitleLine, { opacity }]} />
          <Animated.View style={[styles.serviceSubtitleLine, { opacity }]} />
          <Animated.View style={[styles.descriptionLine, { opacity }]} />
          <Animated.View style={[styles.descriptionLineShort, { opacity }]} />
        </View>

        {/* Date Selection Skeleton */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesContainer}>
            <DateCardSkeleton opacity={opacity} />
            <DateCardSkeleton opacity={opacity} />
            <DateCardSkeleton opacity={opacity} />
            <DateCardSkeleton opacity={opacity} />
            <DateCardSkeleton opacity={opacity} />
          </ScrollView>
        </View>

        {/* Time Slots Skeleton */}
        <View style={styles.section}>
          <Animated.View style={[styles.sectionTitleLine, { opacity }]} />
          <View style={styles.slotsGrid}>
            <TimeSlotSkeleton opacity={opacity} />
            <TimeSlotSkeleton opacity={opacity} />
            <TimeSlotSkeleton opacity={opacity} />
            <TimeSlotSkeleton opacity={opacity} />
            <TimeSlotSkeleton opacity={opacity} />
            <TimeSlotSkeleton opacity={opacity} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const DateCardSkeleton: React.FC<{ opacity: Animated.AnimatedInterpolation<string | number> }> = ({ opacity }) => (
  <Animated.View style={[styles.dateCard, { opacity }]}>
    <View style={styles.dateCardContent} />
  </Animated.View>
);

const TimeSlotSkeleton: React.FC<{ opacity: Animated.AnimatedInterpolation<string | number> }> = ({ opacity }) => (
  <Animated.View style={[styles.timeSlotCard, { opacity }]}>
    <View style={styles.timeSlotTime} />
    <View style={styles.timeSlotSubtext} />
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  header: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 32,
    height: 32,
    backgroundColor: colors.backgroundGray,
    borderRadius: 16,
  },
  headerTitle: {
    width: 150,
    height: 18,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 16,
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
    backgroundColor: colors.backgroundGray,
  },
  serviceInfo: {
    padding: 20,
  },
  serviceTitleLine: {
    width: '70%',
    height: 24,
    backgroundColor: colors.backgroundGray,
    borderRadius: 6,
    marginBottom: 12,
  },
  serviceSubtitleLine: {
    width: '50%',
    height: 24,
    backgroundColor: colors.backgroundGray,
    borderRadius: 6,
    marginBottom: 12,
  },
  descriptionLine: {
    width: '100%',
    height: 15,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  descriptionLineShort: {
    width: '80%',
    height: 15,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitleLine: {
    width: 180,
    height: 18,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
    marginBottom: 16,
  },
  datesContainer: {
    paddingRight: 20,
    gap: 12,
  },
  dateCard: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateCardContent: {
    width: 40,
    height: 60,
    backgroundColor: colors.backgroundGray,
    borderRadius: 6,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlotCard: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 12,
    padding: 20,
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeSlotTime: {
    width: '70%',
    height: 18,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  timeSlotSubtext: {
    width: '50%',
    height: 13,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
  },
});

export default CalendarSkeleton;

