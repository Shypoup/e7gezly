import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { colors } from '../constants/colors';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showToast?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, showToast = true }) => {
  useEffect(() => {
    if (showToast) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'top',
        visibilityTime: 4000,
      });
    }
  }, [message, showToast]);

  return (
    <View style={styles.container}>
      <Icon name="warning-outline" size={64} color={colors.error} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Icon name="refresh" size={20} color={colors.textWhite} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.info,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorMessage;

