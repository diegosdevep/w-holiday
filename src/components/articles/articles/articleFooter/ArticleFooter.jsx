import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { Icon } from 'react-native-elements';
import { styles } from './articleFooter.styles';
import theme from '../../../../styles/theme';
import useLikes from '../../../../hooks/useLikedStatus';
import useSaved from '../../../../hooks/useSavedArticles';
import { formatTimestamp } from '../../../../utils/formatTimestamp';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../../utils/screen';

const ArticleFooter = ({ articleData, userData }) => {
  const navigation = useNavigation();
  const currentUserUid = getAuth().currentUser?.uid;

  const { liked, handleLikePress } = useLikes(currentUserUid, articleData);
  const { saved, handleSavePress } = useSaved(currentUserUid, articleData);

  const goToArticle = () => {
    navigation.navigate(screen.article.articleDetail, {
      articleData,
      userData,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatTimestamp(articleData.createdAt)}</Text>

      <View style={styles.boxIcons}>
        <TouchableOpacity onPress={handleLikePress}>
          <Icon
            type='material-community'
            name={liked ? 'heart' : 'heart-outline'}
            color={liked ? theme.colors.danger.red : theme.colors.black}
            size={25}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSavePress}>
          <Icon
            type='material-community'
            name={saved ? 'bookmark' : 'bookmark-outline'}
            color={saved ? theme.colors.black : ''}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToArticle}>
          <Icon
            type='material-community'
            name={'comment-text-outline'}
            size={27}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArticleFooter;
