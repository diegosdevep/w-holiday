import { NavigationContainer } from '@react-navigation/native';
import { initFirebase } from './src/firebase/firebase';
import Toast from 'react-native-toast-message';
import AppNavigation from './src/routes/AppNavigation';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}