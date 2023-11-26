import { Dimensions, Platform, StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 10 * 2,
  },
  rightCircle: {
    position: 'absolute',
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: theme.colors.secondary.blue100,
    borderRadius: width * 0.275,
    opacity: 0.3,
    left: -80,
    top: 200,
  },
  leftCircle: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: theme.colors.secondary.blue100,
    borderRadius: width * 0.575,
    opacity: 0.2,
    right: -150,
    top: -270,
    zIndex: 1,
  },
  iconBtn: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 40,
  },
  inputBox: {
    marginVertical: 10 * 3,
  },
  forgot: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semiBold,
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
