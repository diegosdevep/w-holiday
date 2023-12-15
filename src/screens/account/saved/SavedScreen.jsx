import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { formatCreatedAt } from '../../../utils/formatCreatedAt';
import { styles } from './savedscreen.styles';
import { useUserContext } from '../../../context/UserProvider';

const SavedScreen = () => {
  const userUid = getAuth().currentUser.uid;
  const [savedIds, setSavedIds] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [expandedArticles, setExpandedArticles] = useState({});
  const { users } = useUserContext();

  const handleReadMoreToggle = (articleId) => {
    setExpandedArticles((prevExpanded) => ({
      ...prevExpanded,
      [articleId]: !prevExpanded[articleId],
    }));
  };

  const getSavedIds = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const userQuery = query(usersCollection, where('uid', '==', userUid));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        const savedIds = userData.saved || [];

        setSavedIds(savedIds);

        return savedIds;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error al obtener los IDs guardados:', error);
      return [];
    }
  };

  const getArticlesData = async () => {
    try {
      const articlesCollection = collection(db, 'articles');
      const articlesQuery = query(
        articlesCollection,
        where('id', 'in', savedIds)
      );
      const articlesSnapshot = await getDocs(articlesQuery);

      const articlesData = articlesSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      // Find and set user data for each article
      const articlesWithUserData = articlesData.map((article) => {
        // Find the user whose uid matches the userId of the article
        const userMatch = users.find(
          (user) => user.data.uid === article.data.userId
        );

        return {
          ...article,
          userData: userMatch ? userMatch.data : null,
        };
      });

      setArticlesData(articlesWithUserData);
      return articlesWithUserData;
    } catch (error) {
      console.error('Error al obtener los datos de los artículos:', error);
      return [];
    }
  };

  useEffect(() => {
    getSavedIds();
  }, []);

  useEffect(() => {
    if (savedIds.length > 0) {
      getArticlesData();
    }
  }, [savedIds]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={articlesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>{item.data.title}</Text>
            <Text style={styles.date}>
              {formatCreatedAt(item.data.createdAt)}
            </Text>

            <Image
              source={{ uri: item.data.images[0] }}
              style={styles.articleImage}
            />

            {item.userData && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 10,
                }}
              >
                <Image
                  source={{ uri: item.userData.imageURL }}
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
                <Text style={styles.userInfo}>
                  {item.userData.displayName || item.userData.email}
                </Text>
              </View>
            )}

            <Text style={styles.articleDescription}>
              {expandedArticles[item.id]
                ? item.data.description
                : item.data.description.length > 200
                ? item.data.description.slice(0, 200) + '...'
                : item.data.description}
            </Text>
            {item.data.description.length > 200 && (
              <TouchableOpacity onPress={() => handleReadMoreToggle(item.id)}>
                <Text style={[styles.articleDescription, { marginTop: 5 }]}>
                  {expandedArticles[item.id] ? 'Ver menos' : 'Ver mas'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default SavedScreen;
