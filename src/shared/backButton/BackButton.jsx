import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../styles/theme';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconBtn}>
      <Icon
        name='arrow-left'
        type='material-community'
        color={theme.colors.grey.grey600}
        size={30}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconBtn: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 40,
  },
  inputBox: {
    marginVertical: 10 * 6,
  },
});
export default BackButton;
