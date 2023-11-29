import { View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { styles } from './formArticle.styles';
import theme from '../../../../styles/theme';

const FormArticle = ({ formik }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titles}>Titulo</Text>
        <Input
          placeholderTextColor={theme.colors.grey.grey400}
          placeholder='Title'
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue('title', text)}
          errorMessage={formik.errors.title}
        />
      </View>

      <View>
        <Text style={styles.titles}>Descripcion</Text>
        <Input
          placeholderTextColor={theme.colors.grey.grey400}
          placeholder='Title'
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.textArea}
          multiline
          onChangeText={(text) => formik.setFieldValue('description', text)}
          errorMessage={formik.errors.description}
        />
      </View>
    </View>
  );
};

export default FormArticle;
