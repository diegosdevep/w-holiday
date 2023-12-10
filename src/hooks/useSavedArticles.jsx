import { useState, useEffect } from 'react';
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../utils/screen';

const useSaved = (currentUserUid, articleData) => {
  const auth = getAuth();
  const navigation = useNavigation();
  const [saved, setSaved] = useState(false);

  const showAlert = () => {
    Alert.alert(
      'Iniciar sesión requerido',
      'Debe iniciar sesión para guardar artículos.',
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
  }, [articleData.id, currentUserUid]);

  const handleSavePress = async () => {
    try {
      if (!currentUserUid) {
        showAlert();
        return;
      }

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

  return { saved, handleSavePress };
};

export default useSaved;
