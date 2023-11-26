import { StyleSheet } from 'react-native';
import theme from '../../../../styles/theme';

export const styles = StyleSheet.create({
  content: {
    minWidth: '90%',
    alignContent: 'center',
    paddingVertical: 15,
  },
  input: {
    paddingHorizontal: 15,
  },
  btnContainer: {
    width: '85%',
    marginTop: 10,
    borderRadius: 6,
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: theme.colors.secondary.blue500,
    color: theme.colors.secondary.blue500,
    padding: 12,
  },
  text: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
});
