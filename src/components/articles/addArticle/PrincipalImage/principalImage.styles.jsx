import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  content: {
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: width,
    resizeMode: 'cover',
  },
});
