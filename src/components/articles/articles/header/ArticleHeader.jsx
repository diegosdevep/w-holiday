import { View, Text } from 'react-native';
import { Icon, Image, Avatar } from 'react-native-elements';
import getCategoryImage from '../../../../utils/categoryImage';
import { styles } from './articleHeader.styles';

const ArticleHeader = ({ userData, articleData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar
          size={30}
          rounded
          icon={{ type: 'material', name: 'person' }}
          source={{ uri: userData?.imageURL }}
        />
        <Text style={styles.displayName}>
          {userData.displayName || userData.email}
        </Text>
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
