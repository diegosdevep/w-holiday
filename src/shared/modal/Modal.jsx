import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import theme from '../../styles/theme';

const Modal = (props) => {
  const { children, show, close } = props;

  return (
    <Overlay isVisible={show} onBackdropPress={close} style={styles.overlay}>
      {children}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    height: 'auto',
    backgroundColor: theme.colors.black,
  },
});

export default Modal;
