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
        options={{ title: 'Articulos' }}
      />
      <Stack.Screen
        name={screen.article.addArticle}
        component={AddArticleScreen}
        options={{ title: 'Crear Articulo' }}
      />
    </Stack.Navigator>
  );
};

export default ArticleStack;
