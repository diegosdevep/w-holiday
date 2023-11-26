import { View } from 'react-native';
import Header from '../../../components/account/profile/header/Header';
import ListOptions from '../../../components/account/profile/listOptions/ListOptions';
import Logout from '../../../components/account/profile/logout/Logout';
import { styles } from './profileScreen.styles';

const ProfileScreen = ({ onReload }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <ListOptions onReload={onReload} />

      <View style={styles.footer}>
        <Logout />
      </View>
    </View>
  );
};

export default ProfileScreen;
