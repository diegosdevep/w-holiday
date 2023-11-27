import { useFormik } from 'formik';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './addArticleScreen.styles';
import { initialValues, validationSchema } from './addArticleScreen.data';
import UploadImage from '../../../components/articles/uploadImage/UploadImage';
import AddArticle from '../../../components/articles/addArticle/AddArticle';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.js';
import { getAuth } from 'firebase/auth';
import PrincipalImage from '../../../components/articles/PrincipalImage/PrincipalImage';

const AddArticleScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const user = auth.currentUser;

        if (user) {
          const articleData = {
            ...formValue,
            userId: user.uid,
            createdAt: new Date(),
          };

          const articlesCollectionRef = collection(db, 'articles');

          await addDoc(articlesCollectionRef, articleData);

          navigation.goBack();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView style={styles.container}>
      <PrincipalImage formik={formik} />
      <View style={styles.content}>
        <AddArticle formik={formik} />

        <UploadImage formik={formik} />

        <View style={styles.btnContainer}>
          <Button
            title='Crear Articulo'
            buttonStyle={styles.btn}
            titleStyle={styles.textBtn}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddArticleScreen;
