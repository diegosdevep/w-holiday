import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  title: {
    marginVertical: 25,
    marginHorizontal: 20,
    fontSize: theme.fontSize.h3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey700,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  likeBox: {
    width: '90%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  likeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey600,
  },
  descriptionBox: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.grey.grey800,
    lineHeight: 22,
    textAlign: 'justify',
  },
  text: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey500,
  },
  btn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
});
