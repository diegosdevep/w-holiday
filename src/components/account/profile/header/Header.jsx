import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import theme from '../../../../styles/theme';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import * as ImageManipulator from 'expo-image-manipulator';

const { width } = Dimensions.get('window');

const Header = () => {
  const { photoURL, email, displayName, uid } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await compressAndUploadImage(result.assets[0].uri);
    }
  };

  const compressAndUploadImage = async (uri) => {
    try {
      const compressedUri = await compressImage(uri, 0.5);
      await uploadImage(compressedUri);
    } catch (error) {
      console.log(error);
    }
  };

  const compressImage = async (uri, compressRatio) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: width / 2 } }],
        { compress: compressRatio, format: ImageManipulator.SaveFormat.JPEG }
      );

      return manipResult.uri;
    } catch (error) {
      throw error;
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, `avatar/${uid}`);

      const snapshot = await uploadBytes(storageRef, blob);

      updatePhotoUrl(snapshot.metadata.fullPath);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePhotoUrl = async (imagePath) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, imagePath);

      const imageUrl = await getDownloadURL(imageRef);
      const auth = getAuth();

      updateProfile(auth.currentUser, { photoURL: imageUrl });

      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, {
          imageURL: imageUrl,
        });
      }

      setAvatar(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.secondary.blue400, 'rgba(87, 153, 255, 0)']}
        style={styles.gradient}
      >
        <Avatar
          size={120}
          rounded
          icon={{ type: 'material', name: 'person' }}
          containerStyle={styles.avatar}
          source={{ uri: avatar }}
        >
          <Avatar.Accessory size={30} onPress={changeAvatar} />
        </Avatar>

        <View>
          <Text style={styles.title}>{displayName || email}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey500,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.secondary.blue400,
    borderColor: theme.colors.secondary.blue900,
    borderWidth: 5,
    marginVertical: 20,
  },
});

export default Header;
