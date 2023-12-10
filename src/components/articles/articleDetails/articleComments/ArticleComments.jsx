import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ArticleComment from '../articleComment/ArticleComment';
import theme from '../../../../styles/theme';

const ArticleComments = ({ comments, showComments, toggleComments }) => (
  <View style={styles.container}>
    {comments?.length > 0 && (
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.6}
        onPress={toggleComments}
      >
        <Text style={styles.text}>
          {showComments
            ? `Ocultar los ${comments.length} comentarios`
            : `Ver los ${comments.length} comentarios`}
        </Text>
      </TouchableOpacity>
    )}

    {showComments &&
      comments?.map((comment) => (
        <ArticleComment key={comment.id} comment={comment} />
      ))}
  </View>
);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  btn: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.grey.grey600,
  },
});

export default ArticleComments;
