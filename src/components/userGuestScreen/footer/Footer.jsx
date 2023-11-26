import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './footer.styles';
import Indicators from '../indicators/Indicators';
import theme from '../../../styles/theme';
import CustomButton from '../../../shared/customButton/CustomButton';

const Footer = ({ currentSlideIndex, slides, skip, goToNextSlide }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Indicators currentSlideIndex={currentSlideIndex} slides={slides} />

      <View style={styles.content}>
        {currentSlideIndex === slides.length - 1 ? (
          <View style={styles.boxButton}>
            <CustomButton
              label='GET STARTED'
              onPress={() => navigation.navigate('Login')}
              textColor={theme.colors.white}
            />
          </View>
        ) : (
          <View style={styles.boxButton}>
            <CustomButton
              label='SKIP'
              onPress={skip}
              backgroundColor={theme.colors.white}
              borderColor={theme.colors.black}
              textColor={theme.colors.black}
            />
            <CustomButton
              label='NEXT'
              onPress={goToNextSlide}
              textColor={theme.colors.white}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Footer;
