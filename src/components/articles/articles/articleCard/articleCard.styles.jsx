import { StyleSheet } from 'react-native';
import theme from '../../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 20,
    borderBottomWidth: 0.3,
    borderColor: theme.colors.grey.grey200,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    minHeight: 40,
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.md,
    color: theme.colors.grey.grey800,
    flexWrap: 'wrap',
  },
  img: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
