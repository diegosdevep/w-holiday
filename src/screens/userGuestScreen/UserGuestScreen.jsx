import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Footer from '../../components/userGuestScreen/footer/Footer';
import Slide from '../../components/userGuestScreen/slide/Slide';
import theme from '../../styles/theme';
import { slides } from '../../utils/slides';
import { screen } from '../../utils/screen';
import BackButton from '../../shared/backButton/BackButton';

const { width, height } = Dimensions.get('window');

const UserGuestScreen = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => navigation.navigate(screen.home.home)} />

      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />

      <Footer
        currentSlideIndex={currentSlideIndex}
        slides={slides}
        navigation={navigation}
        skip={skip}
        goToNextSlide={goToNextSlide}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 40,
    backgroundColor: theme.colors.white,
  },
  iconBtn: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  flatlist: {
    height: height * 0.6,
  },
});

export default UserGuestScreen;
