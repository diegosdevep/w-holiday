import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { categoriasWorkingHoliday } from '../../../../utils/workingsCategories';
import { styles } from './categoryList.styles';

const CategoryList = ({ formik }) => {
  return (
    <View style={styles.fieldContainer}>
      <Picker
        style={styles.picker}
        selectedValue={formik.values.category}
        onValueChange={(itemValue) =>
          formik.setFieldValue('category', itemValue)
        }
      >
        <Picker.Item label='Selecciona un Pais' value='' />
        {categoriasWorkingHoliday.map((category) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.name}
          />
        ))}
      </Picker>
      {formik.touched.category && formik.errors.category && (
        <Text style={styles.error}>{formik.errors.category}</Text>
      )}
    </View>
  );
};

export default CategoryList;
