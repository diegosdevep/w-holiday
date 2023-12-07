import { useEffect, useState, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import ArticleCard from '../articleCard/ArticleCard';
import { styles } from './articleList.styles';

const ArticleList = ({ articles }) => {
  const [users, setUsers] = useState([]);
  const [memoizedUsers, memoizedArticles] = useMemo(
    () => [users, articles],
    [users, articles]
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);

        const usersData = usersSnapshot.docs?.map((userDoc) => ({
          id: userDoc.uid,
          data: userDoc.data(),
        }));

        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
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
