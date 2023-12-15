import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { styles } from './misarticulos.styles';
import { formatCreatedAt } from '../../../utils/formatCreatedAt';
import { Icon } from 'react-native-elements';
import theme from '../../../styles/theme';

const MisArticulosScreen = () => {
  const userUid = getAuth().currentUser.uid;
  const [misArticulos, setMisArticulos] = useState([]);
  const [expandedArticles, setExpandedArticles] = useState({});

  const handleReadMoreToggle = (articleId) => {
    setExpandedArticles((prevExpanded) => ({
      ...prevExpanded,
      [articleId]: !prevExpanded[articleId],
    }));
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro de que quieres eliminar este artículo?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: async () => {
              const articleDocRef = doc(db, 'articles', articleId);
              await deleteDoc(articleDocRef);
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error al eliminar el artículo:', error);
    }
  };

  const subscribeToMisArticulos = () => {
    const articlesCollection = collection(db, 'articles');
    const misArticulosQuery = query(
      articlesCollection,
      where('userId', '==', userUid)
    );

    const unsubscribe = onSnapshot(misArticulosQuery, (snapshot) => {
      const misArticulosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setMisArticulos(misArticulosData);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = subscribeToMisArticulos();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={misArticulos}
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

            <Text style={styles.articleDescription}>
              {expandedArticles[item.id]
                ? item.data.description
                : item.data.description.length > 200
                ? item.data.description.slice(0, 200) + '...'
                : item.data.description}
            </Text>

            <View style={styles.btnContainer}>
              {item.data.description.length > 200 && (
                <TouchableOpacity onPress={() => handleReadMoreToggle(item.id)}>
                  <Text style={styles.articleDescription}>
                    {expandedArticles[item.id] ? 'Ver menos' : 'Ver mas'}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.containerEliminar}
                onPress={() => handleDeleteArticle(item.id)}
              >
                <Icon
                  type='material-community'
                  size={25}
                  name='trash-can-outline'
                  color={theme.colors.grey.grey800}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MisArticulosScreen;
