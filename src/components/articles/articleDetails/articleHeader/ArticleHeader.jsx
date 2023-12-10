import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { formatTimestamp } from '../../../../utils/formatTimestamp';
import theme from '../../../../styles/theme';

const ArticleHeader = ({ userData, createdAt }) => (
  <View style={styles.container}>
    <Avatar
      size={30}
      rounded
      icon={{ type: 'material', name: 'person' }}
      containerStyle={styles.img}
      source={{ uri: userData?.imageURL }}
    />
    <View>
      <Text style={styles.user}>{userData?.displayName}</Text>
      <Text style={styles.date}>{formatTimestamp(createdAt)}</Text>
    </View>
  </View>
);

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  user: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.grey.grey600,
  },
  date: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.grey.grey500,
  },
});
export default ArticleHeader;
