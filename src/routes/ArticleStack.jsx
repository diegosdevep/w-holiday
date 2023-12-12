import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from '../screens/articles/articlesScreen/ArticleScreen';
import { screen } from '../utils/screen';
import AddArticleScreen from '../screens/articles/addArticleScreen/AddArticleScreen';
import ArticleDetailScreen from '../screens/articles/articleDetailScreen/ArticleDetailScreen';

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
      <Stack.Screen
        name={screen.article.articleDetail}
        component={ArticleDetailScreen}
        options={{
          title: 'Detalles de Articulo',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default ArticleStack;
