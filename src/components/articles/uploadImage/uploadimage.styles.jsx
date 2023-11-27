import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  icon: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.grey.grey100,
  },
  error: {
    marginHorizontal: 20,
    marginTop: 10,
    color: 'red',
    paddingLeft: 6,
    fontSize: 12,
  },
  imageStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
