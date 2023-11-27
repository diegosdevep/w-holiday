import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from '../screens/articles/articlesScreen/ArticleScreen';
import { screen } from '../utils/screen';
import AddArticleScreen from '../screens/articles/addArticleScreen/AddArticleScreen';

const Stack = createNativeStackNavigator();

const ArticleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.article.article}
        component={ArticleScreen}
        options={{ title: 'Article' }}
      />
      <Stack.Screen
        name={screen.article.addArticle}
        component={AddArticleScreen}
        options={{ title: 'Add Article' }}
      />
    </Stack.Navigator>
  );
};

export default ArticleStack;
