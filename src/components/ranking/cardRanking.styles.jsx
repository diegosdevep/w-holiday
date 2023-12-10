import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    marginVertical: 10,
    marginHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    ...theme.shadows.iosLight,
  },
  img: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  titleBox: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'justify',
    gap: 5,
  },
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey600,
    alignItems: 'center',
  },
  likeBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingBottom: 5,
    borderColor: theme.colors.grey.grey500,
  },
  like: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey600,
  },
});
