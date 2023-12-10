import { StyleSheet } from 'react-native';
import theme from '../../../../styles/theme';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    width: '100%',
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 15,
  },
  border: {
    width: 40,
    height: 5,
    borderRadius: 50,
    backgroundColor: theme.colors.grey.grey300,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey600,
    paddingVertical: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
  },
  commentInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    alignContent: 'center',
    borderColor: theme.colors.grey.grey300,
    borderRadius: 30,
    paddingLeft: 20,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: '50%',
  },
});
