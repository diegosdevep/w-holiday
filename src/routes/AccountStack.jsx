import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen } from '../utils/screen';
import AccountScreen from '../screens/auth/AccountScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import MisArticulosScreen from '../screens/account/misArticulos/MisArticulosScreen';
import SavedScreen from '../screens/account/saved/SavedScreen';

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{ title: 'OnBoarding' }}
      />
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
        options={{ title: 'Inicia Sesión' }}
      />
      <Stack.Screen
        name={screen.account.register}
        component={RegisterScreen}
        options={{ title: 'Crea una cuenta' }}
      />
      <Stack.Screen
        name={screen.account.saved}
        component={SavedScreen}
        options={{ title: 'Guardados', headerShown: true }}
      />
      <Stack.Screen
        name={screen.account.misArticulos}
        component={MisArticulosScreen}
        options={{ title: 'Mis Articulos', headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
