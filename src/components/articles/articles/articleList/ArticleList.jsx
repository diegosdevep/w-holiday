import { useEffect, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { useUserContext } from '../../../../context/UserProvider';
import ArticleCard from '../articleCard/ArticleCard';
import { styles } from './articleList.styles';

const ArticleList = ({ articles }) => {
  const { users, fetchUsers } = useUserContext();
  const [memoizedUsers, memoizedArticles] = useMemo(
    () => [users, articles],
    [users, articles]
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const articlesWithUserData = memoizedArticles?.map((article) => {
    const userMatch = memoizedUsers?.find(
      (user) => user.data.uid === article.data().userId
    );
    return {
      articleData: article.data(),
      userData: userMatch ? userMatch.data : null,
    };
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={articlesWithUserData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const { articleData, userData } = item;
          return <ArticleCard userData={userData} articleData={articleData} />;
        }}
      />
    </View>
  );
};

export default ArticleList;
