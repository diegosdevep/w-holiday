import { View, Text, Image } from 'react-native';

const ArticleDetailScreen = ({ route }) => {
  const { articleData } = route.params;

  return (
    <View>
      <Image
        source={{ uri: articleData.images[0] }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Title: {articleData.title}</Text>
      <Text>Title: {articleData.description}</Text>
    </View>
  );
};

export default ArticleDetailScreen;
