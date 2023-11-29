import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Icon } from 'react-native-elements';
import { styles } from './articleScreen.styles';
import { screen } from '../../../utils/screen';
import theme from '../../../styles/theme';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import ArticleList from '../../../components/articles/articles/articleList/ArticleList';

const ArticleScreen = () => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
      setArticles(snapshot.docs);
    });
  }, []);

  const goToAddArticle = () => {
    navigation.navigate(screen.article.addArticle);
  };

  return (
    <View style={styles.container}>
      <ArticleList articles={articles} />
      {currentUser && (
        <Icon
          reverse
          type='material-community'
          name='plus'
          containerStyle={styles.btn}
          color={theme.colors.secondary.blue500}
          size={26}
          onPress={goToAddArticle}
        />
      )}
    </View>
  );
};

export default ArticleScreen;
