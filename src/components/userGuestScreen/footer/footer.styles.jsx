import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: height * 0.2,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  content: {
    marginBottom: 20,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  boxButton: {
    flexDirection: 'row',
    gap: 15,
  },
});
