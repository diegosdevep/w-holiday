import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuid } from 'uuid';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.js';
import { getAuth } from 'firebase/auth';

import { useFormik } from 'formik';
import { initialValues, validationSchema } from './addArticleScreen.data';

import FormArticle from '../../../components/articles/addArticle/FormArticle/FormArticle.jsx';
import PrincipalImage from '../../../components/articles/addArticle/PrincipalImage/PrincipalImage';
import CategoryList from '../../../components/articles/addArticle/categoryList/CategoryList';
import UploadImage from '../../../components/articles/addArticle/uploadImage/UploadImage';
import { styles } from './addArticleScreen.styles';

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
            id: uuid(),
            likes: 0,
            likedBy: [],
            comments: [],
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <PrincipalImage formik={formik} />
      <View style={styles.content}>
        <FormArticle formik={formik} />

        <CategoryList formik={formik} />

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
