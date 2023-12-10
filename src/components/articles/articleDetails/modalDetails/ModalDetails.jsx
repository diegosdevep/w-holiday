import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from './modalDetails.styles';
import { Avatar, Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { v4 as uuid } from 'uuid';

const ModalDetails = ({
  isModalVisible,
  closeModal,
  articleId,
  modalComment,
  setModalComment,
}) => {
  const user = getAuth().currentUser;

  const handleComment = async () => {
    try {
      await addDoc(collection(db, 'comments'), {
        id: uuid(),
        articleId,
        userId: user.uid,
        comment: modalComment,
        createdAt: Timestamp.fromDate(new Date()),
      });
      closeModal();
    } catch (error) {
      console.error('Error al crear el comentario:', error);
    }
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <StatusBar backgroundColor={'rgba(0,0,0,0.3)'} />
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <View style={styles.border} />
              <Text style={styles.title}>Comentarios</Text>
            </View>

            <View style={styles.content}>
              <Avatar
                size={30}
                rounded
                icon={{ type: 'material', name: 'person' }}
                containerStyle={styles.img}
                source={{ uri: user?.photoURL }}
              />
              <TextInput
                placeholder='Escribe tu comentario'
                onChangeText={(text) => setModalComment(text)}
                multiline
                style={styles.commentInput}
              />

              <TouchableOpacity onPress={handleComment} activeOpacity={0.7}>
                <Icon type='material-community' name='send' size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalDetails;
