import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Header from '../../../components/auth/header/Header';
import CustomTextInput from '../../../shared/customTextInput/CustomTextInput';
import Footer from '../../../components/auth/footer/Footer';
import BackButton from '../../../shared/backButton/BackButton';
import Toast from 'react-native-toast-message';
import { screen } from '../../../utils/screen';
import { styles } from './registerScreen.styles';
import { useFormik } from 'formik';
import {
  initialValues,
  validationSchema,
} from '../../../components/auth/utils/initialValuesRegister';
import { Button } from 'react-native-elements';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );

        const { uid, displayName, email, photoURL } = userCredential.user;

        const userData = {
          uid,
          displayName,
          email,
          imageURL: photoURL,
          saved: [],
          create_user: new Date().toLocaleString(),
        };

        const firestore = getFirestore();
        const usersCollection = collection(firestore, 'users');
        await addDoc(usersCollection, userData);

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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 300 : 0}
        >
          <View style={styles.content}>
            <View style={styles.leftCircle} />
            <View style={styles.rightCircle} />

            <BackButton
              onPress={() => navigation.navigate(screen.account.login)}
            />

            <Header
              title='Unete a la comunidad!'
              subtitle='La comunidad de viajeros te espera'
            />

            <View style={{ marginTop: 40 }}>
              <CustomTextInput
                type='email-address'
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
              <CustomTextInput
                placeholder='Confirmar Password'
                secureTextEntry
                onChangeText={(text) =>
                  formik.setFieldValue('repeatPassword', text)
                }
                errorMessage={formik.errors.repeatPassword}
              />
            </View>

            <Button
              title='Crear Cuenta'
              buttonStyle={styles.btn}
              titleStyle={styles.textBtn}
              onPress={formik.handleSubmit}
              loading={formik.isSubmitting}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate(screen.account.login)}
              style={styles.registerBtn}
            >
              <Text style={styles.text}>Ya tengo cuenta</Text>
            </TouchableOpacity>
            <Footer />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
