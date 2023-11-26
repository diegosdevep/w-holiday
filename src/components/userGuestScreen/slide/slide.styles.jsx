import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.85,
    alignItems: 'center',
  },
  img: {
    width: width * 0.9,
    height: '60%',
    resizeMode: 'contain',
  },
  title: {
    maxWidth: '90%',
    textAlign: 'center',
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.black,
  },
  subtitle: {
    maxWidth: '90%',
    textAlign: 'center',
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.black,
    marginTop: 10,
    lineHeight: 23,
  },
});
