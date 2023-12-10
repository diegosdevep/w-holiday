import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import CardRanking from '../../components/ranking/CardRanking.jsx';

const RankingScreen = () => {
  const [users, setUsers] = useState([]);
  const [rankingData, setRankingData] = useState([]);

  const [memoizedUsers, memoizedRankingData] = useMemo(
    () => [users, rankingData],
    [users, rankingData]
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

    const unsubscribe = onSnapshot(
      query(collection(db, 'articles'), orderBy('likes', 'desc')),
      (querySnapshot) => {
        const rankingItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setRankingData(rankingItems);
      }
    );

    fetchUsers();

    return () => {
      unsubscribe();
    };
  }, []);

  const dataToRender = useMemo(() => {
    return memoizedRankingData?.map((article) => {
      const userMatch = memoizedUsers?.find(
        (user) => user.data.uid === article.data.userId
      );
      return {
        articleData: article.data,
        userData: userMatch ? userMatch.data : null,
      };
    });
  }, [memoizedRankingData, memoizedUsers]);

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataToRender}
        keyExtractor={(item) => item.articleData.id}
        renderItem={({ item, index }) => (
          <CardRanking item={item} index={index} userData={item.userData} />
        )}
      />
    </View>
  );
};

export default RankingScreen;
