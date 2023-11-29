import { StyleSheet } from 'react-native';
import theme from '../../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 20,
    gap: 5,
  },
  img: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  displayName: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.grey.grey500,
  },
  flag: {
    width: 20,
    height: 20,
  },
});
