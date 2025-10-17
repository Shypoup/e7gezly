import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BaseToast, ErrorToast, ToastConfigParams } from 'react-native-toast-message';
import { colors } from '../constants/colors';

export const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <Icon name="checkmark-circle" size={28} color={colors.success} />
        </View>
      )}
    />
  ),
  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <Icon name="close-circle" size={28} color={colors.error} />
        </View>
      )}
    />
  ),
  info: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <Icon name="information-circle" size={28} color={colors.info} />
        </View>
      )}
    />
  ),
  warning: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={styles.warningToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <Icon name="warning" size={28} color={colors.warning} />
        </View>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: colors.success,
    backgroundColor: colors.backgroundWhite,
    borderLeftWidth: 5,
    borderRadius: 12,
    height: 'auto',
    minHeight: 70,
    paddingVertical: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  errorToast: {
    borderLeftColor: colors.error,
    backgroundColor: colors.backgroundWhite,
    borderLeftWidth: 5,
    borderRadius: 12,
    height: 'auto',
    minHeight: 70,
    paddingVertical: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  infoToast: {
    borderLeftColor: colors.info,
    backgroundColor: colors.backgroundWhite,
    borderLeftWidth: 5,
    borderRadius: 12,
    height: 'auto',
    minHeight: 70,
    paddingVertical: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  warningToast: {
    borderLeftColor: colors.warning,
    backgroundColor: colors.backgroundWhite,
    borderLeftWidth: 5,
    borderRadius: 12,
    height: 'auto',
    minHeight: 70,
    paddingVertical: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  text2: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

