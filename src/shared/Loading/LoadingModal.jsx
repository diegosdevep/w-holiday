import { View, StyleSheet, ActivityIndicator } from 'react-native';
import theme from '../../styles/theme';

const LoadingModal = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={theme.colors.black} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey.grey300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingModal;
