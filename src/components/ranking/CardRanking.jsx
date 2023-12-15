import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../styles/theme';
import { screen } from '../../utils/screen';
import { styles } from './cardRanking.styles';

const CardRanking = ({ item, index, userData }) => {
  const navigation = useNavigation();

  const renderMedal = () => {
    if (index > 2) return null;

    let color = '';
    if (index === 0) color = '#FFD700';
    if (index === 1) color = '#BEBEBE';
    if (index === 2) color = '#CD7F32';

    return (
      <Icon
        type='material-community'
        name='medal-outline'
        color={color}
        containerStyle={styles.medal}
        size={30}
      />
    );
  };

  const handlePress = () => {
    navigation.navigate(screen.article.tab, {
      screen: screen.article.articleDetail,
      params: {
        articleData: item.articleData,
        userData: userData,
      },
    });
  };
  const imageUrl = item?.articleData?.images?.[0];

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handlePress}
      key={item.id}
    >
      <Image source={{ uri: imageUrl }} style={styles.img} />

      <View style={styles.content}>
        <View style={styles.titleBox}>
          {renderMedal()}
          <Text style={styles.title}>{item?.articleData?.title}</Text>
        </View>

        <View style={styles.likeBox}>
          <Icon
            type='material'
            name='arrow-drop-up'
            size={30}
            color={theme.colors.grey.grey500}
          />
          <Text style={styles.like}>{item.articleData?.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardRanking;
