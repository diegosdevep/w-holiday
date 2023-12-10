import React, { useState } from 'react';
import { Alert, ScrollView, Text, Dimensions } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { styles } from './uploadimage.styles';
import theme from '../../../../styles/theme';
import { v4 as uuid } from 'uuid';
import * as ImageManipulator from 'expo-image-manipulator';

const { width } = Dimensions.get('window');

const UploadImage = ({ formik }) => {
  const openGallery = async () => {
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
        [{ resize: { width: 400, height: 400 } }],
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
      const storageRef = ref(storage, `articles/${uuid()}`);

      const snapshot = await uploadBytes(storageRef, blob);
      updatePhotoArticle(snapshot.metadata.fullPath);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'Error al cargar la imagen. Por favor, inténtelo de nuevo.'
      );
    }
  };

  const updatePhotoArticle = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);

    formik.setFieldValue('images', [...formik.values.images, imageUrl]);
  };

  const removeImage = (img) => {
    Alert.alert(
      'Delete image',
      'Are you sure to delete this image?',
      [
        { text: 'Canceled', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            const storage = getStorage();
            const imageRef = ref(storage, img);
            try {
              await deleteObject(imageRef);
            } catch (error) {
              console.log('Error deleting image: ', error);
            }

            const result = formik.values.images.filter(
              (image) => image !== img
            );
            formik.setFieldValue('images', result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type='material-community'
          name='camera'
          color={theme.colors.grey.grey500}
          containerStyle={styles.icon}
          onPress={openGallery}
        />

        {formik.values.images &&
          formik.values.images.map((image) => (
            <Avatar
              key={image}
              source={{ uri: image }}
              containerStyle={styles.imageStyle}
              onPress={() => removeImage(image)}
            />
          ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>
    </>
  );
};

export default UploadImage;
