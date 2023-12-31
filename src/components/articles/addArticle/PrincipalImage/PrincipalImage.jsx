import { View } from 'react-native';
import { Image } from 'react-native-elements';
import { styles } from './principalImage.styles';

const PrincipalImage = ({ formik }) => {
  const primaryImage = formik.values.images[0];
  const imageSource = primaryImage
    ? { uri: primaryImage }
    : require('../../../../../assets/notfound.png');

  return (
    <View style={styles.content}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

export default PrincipalImage;
