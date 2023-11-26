import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RankingScreen from '../screens/ranking/RankingScreen';
import { screen } from '../utils/screen';

const Stack = createNativeStackNavigator();

const RankingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.ranking.ranking}
        component={RankingScreen}
        options={{ title: 'Ranking' }}
      />
    </Stack.Navigator>
  );
};

export default RankingStack;
