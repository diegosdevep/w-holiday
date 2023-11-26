import { View } from 'react-native';
import theme from '../../../styles/theme';
import { styles } from './indicators.styles';

const Indicators = ({ currentSlideIndex, slides }) => {
  return (
    <View style={styles.container}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            currentSlideIndex == index && {
              backgroundColor: theme.colors.grey.grey600,
              width: 25,
            },
          ]}
        />
      ))}
    </View>
  );
};

export default Indicators;
