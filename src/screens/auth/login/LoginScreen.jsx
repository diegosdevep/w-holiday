import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import Header from '../../../components/auth/header/Header';
import Footer from '../../../components/auth/footer/Footer';
import CustomTextInput from '../../../shared/customTextInput/CustomTextInput';
import BackButton from '../../../shared/backButton/BackButton';
import { styles } from './loginScreen.styles';
import { screen } from '../../../utils/screen';
import { useFormik } from 'formik';
import {
  initialValues,
  validationSchema,
} from '../../../components/auth/utils/initialValuesLogin';
import theme from '../../../styles/theme';

const LoginScreen = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.account.account);
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Usuario o contraseña incorrecta',
        });
      }
    },
  });

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <View style={styles.content}>
            <View style={styles.leftCircle} />
            <View style={styles.rightCircle} />

            <BackButton onPress={() => navigation.navigate(screen.home.home)} />

            <Header title='Volviste!' subtitle='Nos alegra que hayas vuelto!' />

            <View style={styles.inputBox}>
              <CustomTextInput
                placeholder='Email'
                onChangeText={(text) => formik.setFieldValue('email', text)}
                errorMessage={formik.errors.email}
              />
              <CustomTextInput
                placeholder='Password'
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('password', text)}
                errorMessage={formik.errors.password}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.forgot}>Olvidaste tu contraseña?</Text>
            </View>

            <Button
              title='Inicia Sesion'
              buttonStyle={styles.btn}
              titleStyle={styles.textBtn}
              onPress={formik.handleSubmit}
              loading={formik.isSubmitting}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate(screen.account.register)}
              style={styles.registerBtn}
            >
              <Text style={styles.text}>Crea una nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <View style={{ marginBottom: 30 }}>
          <Footer />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
