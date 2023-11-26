import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  indicator: {
    height: 5.5,
    width: 10,
    backgroundColor: theme.colors.grey.grey300,
    marginHorizontal: 3,
    borderRadius: 2,
  },
});
