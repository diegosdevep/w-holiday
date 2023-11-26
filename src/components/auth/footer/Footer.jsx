import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../../styles/theme';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>O continua con</Text>

      <View style={styles.box}>
        <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
          <Icon
            name='google'
            type='material-community'
            color={theme.colors.black}
            size={10 * 3}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
          <Icon
            name='apple'
            type='material-community'
            color={theme.colors.black}
            size={10 * 3}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
          <Icon
            name='facebook'
            type='material-community'
            color={theme.colors.black}
            size={10 * 3}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  text: {
    color: theme.colors.grey.grey800,
    textAlign: 'center',
    fontSize: 14,
  },
  box: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    padding: 10,
    backgroundColor: theme.colors.grey.grey100,
    borderRadius: 10 / 2,
    marginHorizontal: 10,
  },
});

export default Footer;
