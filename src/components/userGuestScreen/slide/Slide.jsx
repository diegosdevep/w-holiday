import { View, Image, Text } from 'react-native';
import { styles } from './slide.styles';

const Slide = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item?.image} style={styles.img} />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

export default Slide;
