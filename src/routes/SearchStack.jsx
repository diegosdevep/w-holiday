import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen } from '../utils/screen';
import SearchScreen from '../screens/search/SearchScreen';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.search.search}
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
