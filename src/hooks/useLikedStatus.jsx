import { useState, useEffect } from 'react';
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
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { Alert } from 'react-native';
import { screen } from '../utils/screen';
import { useNavigation } from '@react-navigation/native';

const useLikes = (currentUserUid, articleData) => {
  const auth = getAuth();
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(articleData.likes || 0);

  const showAlert = () => {
    Alert.alert(
      'Iniciar sesión requerido',
      'Debe iniciar sesión para poner me gusta.',
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
              setLikes(querySnapshot.docs[0].data().likes || 0);
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
  }, [articleData.id, currentUserUid]);

  const handleLikePress = async () => {
    if (!currentUserUid) {
      showAlert();
      return;
    }

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
      console.error('Error updating "likedBy" field:', error);
    }
  };

  return { liked, setLiked, likes, setLikes, handleLikePress };
};
export default useLikes;
