import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { styles } from './changeDisplayName.styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangeDisplayData.data';
import { getAuth, updateProfile } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import theme from '../../../../styles/theme';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';

const ChangeDisplayName = ({ onClose, onReload }) => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;
        const uid = currentUser.uid;

        await updateProfile(currentUser, { displayName });

        await currentUser.reload();

        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          await updateDoc(userDocRef, {
            displayName: displayName,
          });
        }

        onClose();
        onReload();
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error changing field',
        });
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        containerStyle={styles.input}
        placeholder='Name and Lastname'
        rightIcon={{
          name: 'account',
          type: 'material-community',
          color: theme.colors.grey.grey500,
        }}
        onChangeText={(text) => formik.setFieldValue('displayName', text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        titleStyle={styles.text}
        title='Save'
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
};

export default ChangeDisplayName;
