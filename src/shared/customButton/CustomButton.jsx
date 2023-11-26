import { TouchableOpacity, Text } from 'react-native';
import { styles } from './customButton.styles';

const CustomButton = ({
  label,
  onPress,
  backgroundColor,
  borderColor,
  textColor,
  style,
}) => {
  const buttonStyles = {
    ...styles.btn,
    backgroundColor: backgroundColor || styles.btn.backgroundColor,
    borderColor: borderColor || styles.btn.borderColor,
  };

  const textStyles = {
    ...styles.text,
    color: textColor || styles.text.color,
  };

  return (
    <TouchableOpacity style={[buttonStyles, style]} onPress={onPress}>
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
