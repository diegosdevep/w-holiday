import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    marginHorizontal: 10,
  },
  btnContainer: {
    marginHorizontal: 10,
  },
  btn: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: theme.colors.secondary.blue500,
  },
  textBtn: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semiBold,
  },
});
