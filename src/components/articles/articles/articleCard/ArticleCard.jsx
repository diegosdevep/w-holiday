import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArticleFooter from '../articleFooter/ArticleFooter';
import ArticleHeader from '../header/ArticleHeader';
import { screen } from '../../../../utils/screen';
import { styles } from './articleCard.styles';

const ArticleCard = ({ userData, articleData }) => {
  const navigation = useNavigation();

  const handleArticlePress = () => {
    navigation.navigate(screen.article.articleDetail, {
      articleData,
      userData,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={handleArticlePress}>
        {userData && (
          <View style={{ flex: 1 }}>
            <ArticleHeader articleData={articleData} userData={userData} />
            <Text style={styles.title}>{articleData.title}</Text>
          </View>
        )}

        {articleData.images[0] ? (
          <Image source={{ uri: articleData.images[0] }} style={styles.img} />
        ) : (
          <Image
            source={require('../../../../../assets/notfound.png')}
            style={styles.img}
          />
        )}
      </TouchableOpacity>

      <ArticleFooter articleData={articleData} userData={userData} />
    </View>
  );
};

export default ArticleCard;
