import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import theme from '../../../../styles/theme';
import { formatCreatedAt } from '../../../../utils/formatCreatedAt';

const ArticleComment = ({ comment }) => {
  const formattedDate = formatCreatedAt(comment.createdAt);

  return (
    <View style={styles.container}>
      <Avatar
        size={30}
        rounded
        icon={{ type: 'material', name: 'person' }}
        containerStyle={styles.img}
        source={{ uri: comment?.user?.imageURL }}
      />
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text style={styles.user}>
            {comment?.user?.displayName || comment?.user?.email}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <Text style={styles.text}>{comment.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  content: {
    width: '90%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    textAlign: 'justify',
    alignSelf: 'center',
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  user: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey600,
  },
  text: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.grey.grey700,
  },
  date: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.grey.grey500,
  },
});

export default ArticleComment;
