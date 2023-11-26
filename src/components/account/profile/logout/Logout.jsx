import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { Button, Icon } from 'react-native-elements';
import theme from '../../../../styles/theme';
import { screen } from '../../../../utils/screen';

const Logout = () => {
  const auth = getAuth();
  const navigation = useNavigation();

  const logout = () => {
    signOut(auth);

    navigation.navigate(screen.home.tab);
  };

  return (
    <Button
      title='Logout'
      onPress={logout}
      buttonStyle={{ backgroundColor: 'transparent' }}
      titleStyle={{
        color: theme.colors.grey.grey400,
        fontWeight: theme.fontWeight.semiBold,
        fontSize: theme.fontSize.xl,
      }}
      icon={
        <Icon
          name='logout'
          size={30}
          containerStyle={{ marginRight: 5 }}
          color={theme.colors.grey.grey400}
        />
      }
    />
  );
};

export default Logout;
