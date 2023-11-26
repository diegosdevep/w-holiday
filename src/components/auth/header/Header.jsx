import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

const Header = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: theme.colors.secondary.blue500,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 20,
    maxWidth: '60%',
    textAlign: 'center',
  },
});
export default Header;
