import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../constants/colors';

const ServicesSkeleton: React.FC = () => {
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
        <View style={styles.headerTitle} />
        <View style={styles.notificationButton} />
      </View>
      <View style={styles.listContainer}>
        <SkeletonCard opacity={opacity} />
        <SkeletonCard opacity={opacity} />
        <SkeletonCard opacity={opacity} />
        <SkeletonCard opacity={opacity} />
        <SkeletonCard opacity={opacity} />
      </View>
    </View>
  );
};

const SkeletonCard: React.FC<{ opacity: Animated.AnimatedInterpolation<string | number> }> = ({ opacity }) => (
  <Animated.View style={[styles.card, { opacity }]}>
    <View style={styles.cardContent}>
      <View style={styles.iconContainer} />
      <View style={styles.textContainer}>
        <View style={styles.titleLine} />
        <View style={styles.subtitleLine} />
        <View style={styles.statusRow}>
          <View style={styles.statusBadge} />
          <View style={styles.priceBadge} />
        </View>
      </View>
      <View style={styles.chevron} />
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    width: 120,
    height: 28,
    backgroundColor: colors.backgroundGray,
    borderRadius: 6,
  },
  notificationButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.backgroundGray,
    borderRadius: 20,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.backgroundSecondary,
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
    backgroundColor: colors.backgroundGray,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  titleLine: {
    width: '80%',
    height: 18,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  subtitleLine: {
    width: '60%',
    height: 14,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    width: 60,
    height: 14,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
  },
  priceBadge: {
    width: 40,
    height: 14,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
  },
  chevron: {
    width: 20,
    height: 32,
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default ServicesSkeleton;

