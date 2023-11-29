import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';
import getCategoryImage from '../../../../utils/categoryImage';
import { styles } from './articleHeader.styles';

const ArticleHeader = ({ userData, articleData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: userData.imageURL }} style={styles.img} />
        <Text style={styles.displayName}>{userData.displayName}</Text>
      </View>

      <View style={styles.row}>
        <Image
          source={getCategoryImage(articleData.category)}
          style={styles.flag}
        />
        <Text style={styles.displayName}>{articleData.category}</Text>
      </View>
    </View>
  );
};

export default ArticleHeader;
