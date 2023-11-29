const categoryImagePaths = {
  Alemania: require('../../assets/flags/alemaniaFlag.png'),
  Andorra: require('../../assets/flags/andorraFlag.png'),
  Austria: require('../../assets/flags/austriaFlag.png'),
  Australia: require('../../assets/flags/australiaFlag.png'),
  Canada: require('../../assets/flags/canadaFlag.png'),
  Dinamarca: require('../../assets/flags/dinamarcaFlag.png'),
  España: require('../../assets/flags/spainFlag.png'),
  Francia: require('../../assets/flags/franciaFlag.png'),
  Holanda: require('../../assets/flags/holandaFlag.png'),
  Hungria: require('../../assets/flags/hungriaFlag.png'),
  Irlanda: require('../../assets/flags/irlandaFlag.png'),
  Luxemburgo: require('../../assets/flags/luxemburgoFlag.png'),
  Japon: require('../../assets/flags/japonFlag.png'),
  Mexico: require('../../assets/flags/mexicoFlag.png'),
  Noruega: require('../../assets/flags/noruegaFlag.png'),
  NuevaZelanda: require('../../assets/flags/nuevazelandaFlag.png'),
  Polonia: require('../../assets/flags/poloniaFlag.png'),
  Portugal: require('../../assets/flags/portugalFlag.png'),
  Suecia: require('../../assets/flags/sueciaFlag.png'),
  default: require('../../assets/notfound.png'),
};

const getCategoryImage = (categoryName) => {
  return categoryImagePaths[categoryName] || categoryImagePaths.default;
};

export default getCategoryImage;
