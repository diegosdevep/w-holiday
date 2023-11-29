import { StyleSheet } from 'react-native';
import theme from '../../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  titles: {
    marginLeft: 15,
    marginBottom: 10,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.grey.grey600,
  },
  input: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.grey.grey600,
    padding: 10 * 1.7,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey.grey400,
  },
  textArea: {
    height: 200,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey.grey400,
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.grey.grey600,
    textAlignVertical: 'top',
  },
});
