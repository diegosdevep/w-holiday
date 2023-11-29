import { StyleSheet } from 'react-native';
import theme from '../../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  date: {
    color: theme.colors.grey.grey500,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semiBold,
  },
  boxIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
});
