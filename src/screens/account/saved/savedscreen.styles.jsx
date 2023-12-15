import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  userInfo: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semiBold,
  },
  articleContainer: {
    marginBottom: 16,
  },
  articleTitle: {
    fontSize: theme.fontSize.h3,
    fontWeight: theme.fontWeight.semiBold,
    marginVertical: 15,
  },
  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 15,
  },
  articleDescription: {
    fontSize: theme.fontSize.md,
    color: theme.colors.grey.grey500,
    textAlign: 'justify',
  },
  date: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey500,
    marginBottom: 10,
  },
});
