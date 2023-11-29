import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { db } from '../../../../firebase/firebase';
import ArticleCard from '../articleCard/ArticleCard';
import { styles } from './articleList.styles';

const ArticleList = ({ articles }) => {
  const [users, setUsers] = useState([]);

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

  const articlesWithUserData = articles?.map((article) => {
    const userMatch = users?.find((user) => user.id === article.userId);

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
