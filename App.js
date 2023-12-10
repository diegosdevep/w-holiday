import { NavigationContainer } from '@react-navigation/native';
import { initFirebase } from './src/firebase/firebase';
import Toast from 'react-native-toast-message';
import AppNavigation from './src/routes/AppNavigation';
import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import theme from './src/styles/theme';

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.white}
        hidden={false}
        barStyle='default'
        // translucent={false}
      />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}
