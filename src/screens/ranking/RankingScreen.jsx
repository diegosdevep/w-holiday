import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import CardRanking from '../../components/ranking/CardRanking.jsx';
import DropDownRanking from '../../components/ranking/dropdown/DropDownRanking';

const RankingScreen = () => {
  const [users, setUsers] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('selectedCountry');

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

    let baseQuery = collection(db, 'articles');

    const fetchRankingData = async () => {
      try {
        let baseQuery = collection(db, 'articles');

        if (
          selectedCategory !== null &&
          selectedCategory !== 'selectedCountry'
        ) {
          baseQuery = query(
            baseQuery,
            where('category', '==', selectedCategory)
          );
        }

        baseQuery = query(baseQuery, orderBy('likes', 'desc'));

        const rankingSnapshot = await getDocs(baseQuery);
        const rankingItems = rankingSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setRankingData(rankingItems);
      } catch (error) {
        console.error('Error fetching ranked data:', error);
      }
    };

    const unsubscribe = onSnapshot(baseQuery, fetchRankingData);

    fetchUsers();
    if (selectedCategory === null) {
      fetchRankingData();
    }

    return () => {
      unsubscribe();
    };
  }, [selectedCategory]);

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
      <DropDownRanking
        onSelectCategory={(category) => setSelectedCategory(category)}
      />

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
