import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from '../screens/articles/ArticleScreen';
import { screen } from '../utils/screen';

const Stack = createNativeStackNavigator();

const ArticleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.article.article}
        component={ArticleScreen}
        options={{ title: 'Article' }}
      />
    </Stack.Navigator>
  );
};

export default ArticleStack;
