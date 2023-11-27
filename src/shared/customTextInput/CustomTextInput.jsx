import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import theme from '../../styles/theme';

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  errorMessage,
  type,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <Input
      keyboardType={type}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={theme.colors.grey.grey600}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={[styles.input, focused && styles.focused]}
      errorMessage={errorMessage}
      inputContainerStyle={{ borderBottomWidth: 0 }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    padding: 10 * 2,
    backgroundColor: theme.colors.secondary.blue50,
    borderRadius: 10,
  },
  focused: {
    borderWidth: 0,
    borderColor: theme.colors.secondary.blue200,
    ...theme.shadows.iosLight,
  },
});

export default CustomTextInput;
