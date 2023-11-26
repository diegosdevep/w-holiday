import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { iconOptions } from '../utils/iconOptions';
import { screen } from '../utils/screen';
import theme from '../styles/theme';
import HomeStack from './HomeStack';
import RankingStack from './RankingStack';
import ArticleStack from './ArticleStack';
import SearchStack from './SearchStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.secondary.blue500,
        tabBarInactiveTintColor: theme.colors.grey.grey500,
        tabBarIcon: ({ color, size, focused }) =>
          iconOptions(route, color, size, focused),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
        },
      })}
    >
      <Tab.Screen name={screen.home.tab} component={HomeStack} />
      <Tab.Screen name={screen.ranking.tab} component={RankingStack} />
      <Tab.Screen name={screen.article.tab} component={ArticleStack} />
      <Tab.Screen name={screen.search.tab} component={SearchStack} />
      <Tab.Screen name={screen.account.tab} component={AccountStack} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
