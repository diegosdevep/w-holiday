import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Icon } from 'react-native-elements';
import { styles } from './articleFooter.styles';
import theme from '../../../../styles/theme';
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion,
  increment,
  onSnapshot,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../../firebase/firebase.js';

const ArticleFooter = ({ articleData }) => {
  const auth = getAuth();
  const currentUserUid = auth.currentUser?.uid;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    return formattedDate;
  };

  useEffect(() => {
    const loadLikedStatus = async () => {
      try {
        if (currentUserUid && articleData && articleData.id) {
          const articlesCollection = collection(db, 'articles');
          const q = query(
            articlesCollection,
            where('id', '==', articleData.id)
          );

          const unsubscribeLikedStatus = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
              const currentLikedBy = querySnapshot.docs[0].data().likedBy || [];
              setLiked(currentLikedBy.includes(currentUserUid));
            }
          });

          return () => {
            unsubscribeLikedStatus();
          };
        }
      } catch (error) {
        console.error('Error loading liked status:', error);
      }
    };

    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLiked(false);
      }
    });

    loadLikedStatus();

    return () => {
      unsubscribeAuthStateChanged();
    };
  }, [articleData.id, currentUserUid, auth]);

  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        if (currentUserUid) {
          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('uid', '==', currentUserUid));
          const userSnapshot = await getDocs(q);

          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            setSaved(userData.saved.includes(articleData.id));
          }

          const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
              if (snapshot.empty) {
                setSaved(false);
              } else {
                const updatedUserData = snapshot.docs[0].data();
                setSaved(
                  updatedUserData?.saved.includes(articleData.id) || false
                );
              }
            },
            (error) => {
              console.error('Error subscribing to real-time updates:', error);
            }
          );

          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error loading saved articles:', error);
      }
    };

    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setSaved(false);
      }
    });

    loadSavedArticles();

    return () => {
      unsubscribeAuthStateChanged();
    };
  }, [articleData.id, currentUserUid, auth]);

  const handleLikePress = async () => {
    try {
      if (currentUserUid) {
        const articlesCollection = collection(db, 'articles');
        const q = query(articlesCollection, where('id', '==', articleData.id));
        const articleSnapshot = await getDocs(q);

        if (!articleSnapshot.empty) {
          const articleDocRef = articleSnapshot.docs[0].ref;
          const currentLikedBy = articleSnapshot.docs[0].data().likedBy || [];

          if (!currentLikedBy.includes(currentUserUid)) {
            await updateDoc(articleDocRef, {
              likes: increment(1),
              likedBy: arrayUnion(currentUserUid),
            });

            setLiked(true);
          } else {
            await updateDoc(articleDocRef, {
              likes: increment(-1),
              likedBy: arrayRemove(currentUserUid),
            });

            setLiked(false);
          }
        }
      }
    } catch (error) {
      console.error('Error actualizando el campo "likedBy":', error);
    }
  };

  const handleSavePress = async () => {
    try {
      if (currentUserUid) {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('uid', '==', currentUserUid));
        const userSnapshot = await getDocs(q);

        if (!userSnapshot.empty) {
          const userDocRef = userSnapshot.docs[0].ref;
          const userData = userSnapshot.docs[0].data();

          const isArticleSaved = userData.saved.includes(articleData.id);

          await updateDoc(userDocRef, {
            saved: isArticleSaved
              ? arrayRemove(articleData.id)
              : arrayUnion(articleData.id),
          });

          setSaved(!isArticleSaved);
        } else {
          console.log('No se encontró el documento del usuario');
        }
      }
    } catch (error) {
      console.error('Error updating "saved" field:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatTimestamp(articleData.createdAt)}</Text>

      <View style={styles.boxIcons}>
        <TouchableOpacity onPress={handleLikePress}>
          <Icon
            type='material-community'
            name={liked ? 'heart' : 'heart-outline'}
            color={liked ? theme.colors.danger.red : theme.colors.black}
            size={25}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSavePress}>
          <Icon
            type='material-community'
            name={saved ? 'bookmark' : 'bookmark-outline'}
            color={saved ? theme.colors.black : ''}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArticleFooter;
