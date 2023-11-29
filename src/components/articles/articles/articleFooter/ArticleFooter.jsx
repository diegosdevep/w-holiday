import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './articleFooter.styles';

const ArticleFooter = ({ articleData }) => {
  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatTimestamp(articleData.createdAt)}</Text>

      <View style={styles.boxIcons}>
        <TouchableOpacity>
          <Icon type='material-community' name='heart-outline' size={25} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon type='material-community' name='bookmark-outline' size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArticleFooter;
