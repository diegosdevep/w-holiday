import { View, Text, TouchableOpacity, Image } from 'react-native';
import ArticleHeader from '../header/ArticleHeader';
import { styles } from './articleCard.styles';
import ArticleFooter from '../articleFooter/ArticleFooter';

const ArticleCard = ({ userData, articleData }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content}>
        {userData && (
          <View style={{ flex: 1 }}>
            <ArticleHeader articleData={articleData} userData={userData} />

            <Text style={styles.title}>{articleData.title}</Text>
          </View>
        )}

        <Image source={{ uri: articleData.images[0] }} style={styles.img} />
      </TouchableOpacity>

      <ArticleFooter articleData={articleData} />
    </View>
  );
};

export default ArticleCard;