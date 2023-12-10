import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../../../styles/theme';

const LikeSavedButtons = ({
  liked,
  saved,
  handleLikePress,
  handleSavePress,
}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
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
    </View>
  );
};

export default LikeSavedButtons;
