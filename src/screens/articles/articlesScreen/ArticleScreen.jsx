import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Icon } from 'react-native-elements';
import { styles } from './articleScreen.styles';
import { screen } from '../../../utils/screen';
import theme from '../../../styles/theme';

const ArticleScreen = () => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const goToAddArticle = () => {
    navigation.navigate(screen.article.addArticle);
  };

  return (
    <View style={styles.container}>
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
