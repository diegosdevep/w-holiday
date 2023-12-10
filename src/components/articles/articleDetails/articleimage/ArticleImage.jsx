import { StyleSheet, Image } from 'react-native';

const ArticleImage = ({ imageUrl }) => (
  <Image
    source={
      imageUrl
        ? { uri: imageUrl }
        : require('../../../../../assets/notfound.png')
    }
    style={styles.img}
  />
);

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
});
export default ArticleImage;
