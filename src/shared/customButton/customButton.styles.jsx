import { StyleSheet, Platform } from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  btn: {
    flex: 1,
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.secondary.blue500,
    borderColor: theme.colors.secondary.blue500,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'ios' ? theme.shadows.iosLight : theme.shadows.light),
  },
  text: {
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.lg,
    color: theme.colors.black,
  },
});
