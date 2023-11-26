import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../styles/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  header: {
    height: height * 0.3,
  },

  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -100,
  },
  box: {
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cantidad: {
    fontSize: theme.fontSize.h1,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey500,
    ...theme.shadows.iosLight,
  },
  text: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.grey.grey600,
  },

  content: {
    height: height * 0.3,
    justifyContent: 'flex-start',
  },
  footer: {
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
