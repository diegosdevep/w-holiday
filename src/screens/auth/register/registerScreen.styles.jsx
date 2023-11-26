import { Platform, StyleSheet, Dimensions } from 'react-native';
import theme from '../../../styles/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10 * 2,
  },
  rightCircle: {
    position: 'absolute',
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: theme.colors.secondary.blue100,
    borderRadius: width * 0.275,
    opacity: 0.3,
    top: -30,
    right: -50,
    zIndex: 1,
  },
  leftCircle: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: theme.colors.secondary.blue100,
    borderRadius: width * 0.575,
    opacity: 0.2,
    left: -330,
    top: -100,
  },
  forgot: {
    fontSize: 14,
    color: theme.colors.secondary.blue500,
    alignSelf: 'flex-end',
  },
  btn: {
    padding: 15,
    backgroundColor: theme.colors.secondary.blue500,
  },
  textBtn: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semiBold,
  },
  registerBtn: {
    padding: 10,
    marginTop: 30,
  },
  text: {
    color: theme.colors.secondary.blue500,
    textAlign: 'center',
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semiBold,
  },
});
