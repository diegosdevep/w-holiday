import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import useLikes from '../../../hooks/useLikedStatus';
import useSaved from '../../../hooks/useSavedArticles';
import LikeSavedButtons from '../../../components/articles/articleDetails/likeSavedButtons/LikeSavedButtons';
import ModalDetails from '../../../components/articles/articleDetails/modalDetails/ModalDetails';
import ArticleHeader from '../../../components/articles/articleDetails/articleHeader/ArticleHeader';
import ArticleImage from '../../../components/articles/articleDetails/articleimage/ArticleImage';
import ArticleComments from '../../../components/articles/articleDetails/articleComments/ArticleComments';
import { db } from '../../../firebase/firebase';
import { styles } from './articleDetailsScreen.styles';
import theme from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils/screen';

const ArticleDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { articleData, userData } = route.params;
  const currentUserUid = getAuth().currentUser?.uid;
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);

  const { liked, likes, handleLikePress } = useLikes(
    currentUserUid,
    articleData
  );
  const { saved, handleSavePress } = useSaved(currentUserUid, articleData);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalComment, setModalComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      getAuth(),
      (user) => {
        setCurrentUser(user);
      }
    );

    return () => {
      unsubscribeAuthStateChanged();
    };
  }, []);

  const openModal = () => {
    if (!currentUser) {
      Alert.alert(
        'Iniciar sesión requerido',
        'Debe iniciar sesión para escribir un comentario.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Iniciar sesión',
            onPress: () => {
              navigation.navigate(screen.account.tab, {
                screen: screen.account.login,
              });
            },
          },
        ]
      );
      return;
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const commentsCollection = collection(db, 'comments');
    const q = query(
      commentsCollection,
      where('articleId', '==', articleData.id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const promises = querySnapshot.docs.map(async (doc) => {
        const comment = doc.data();
        const userQuery = query(
          collection(db, 'users'),
          where('uid', '==', comment.userId)
        );

        try {
          const userQuerySnapshot = await getDocs(userQuery);
          const userData = userQuerySnapshot.docs[0].data();

          return {
            ...comment,
            user: userData,
          };
        } catch (error) {
          console.error('Error al obtener datos de usuario:', error);
          throw error;
        }
      });

      try {
        const commentsData = await Promise.all(promises);
        setComments(commentsData);
      } catch (error) {
        console.error('Error al obtener comentarios:', error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [articleData.id]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <ArticleImage imageUrl={articleData.images[0]} />

          <Text style={styles.title}>{articleData.title}</Text>

          <View style={styles.header}>
            <ArticleHeader
              userData={userData}
              createdAt={articleData.createdAt}
            />

            <LikeSavedButtons
              saved={saved}
              liked={liked}
              handleLikePress={handleLikePress}
              handleSavePress={handleSavePress}
            />
          </View>

          <View style={styles.likeBox}>
            <Text style={styles.likeText}>{likes} Me Gusta</Text>
          </View>

          <View style={styles.descriptionBox}>
            <Text style={styles.description}>
              {articleData.description.length > 500
                ? articleData.description.slice(0, 500) + '...'
                : articleData.description}
            </Text>
          </View>

          <ArticleComments
            comments={comments}
            showComments={showComments}
            toggleComments={toggleComments}
          />

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={openModal}
          >
            <Icon
              type='material-community'
              name={'square-edit-outline'}
              size={30}
              color={theme.colors.grey.grey500}
            />
            <Text style={styles.text}>Escribe un comentario</Text>
          </TouchableOpacity>

          <ModalDetails
            isModalVisible={isModalVisible}
            closeModal={closeModal}
            articleId={articleData.id}
            modalComment={modalComment}
            setModalComment={setModalComment}
            setComment={setComments}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ArticleDetailScreen;
