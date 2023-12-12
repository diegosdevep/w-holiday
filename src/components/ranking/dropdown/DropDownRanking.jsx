import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { categoriasWorkingHoliday } from '../../../utils/workingsCategories';
import { styles } from './dropdown.styles';

const DropdownComponent = ({ onSelectCategory }) => {
  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Image source={item.image} style={styles.flagIcon} />
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color='black'
            name='Safety'
            size={20}
          />
        )}
      </View>
    );
  };

  const dropdownData = [
    {
      label: 'selectedCountry',
      value: null,
      image: require('../../../../assets/notfound.png'),
    },
    ...categoriasWorkingHoliday.map((category) => ({
      label: category.name,
      value: category.id.toString(),
      image: category.image,
    })),
  ];

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={dropdownData}
      search
      maxHeight={300}
      labelField='label'
      valueField='value'
      placeholder='Selecciona un Pais'
      searchPlaceholder='Search...'
      value={value}
      onChange={(item) => {
        setValue(item.value);
        onSelectCategory(item.label);
      }}
      renderLeftIcon={(item) => (
        <AntDesign style={styles.icon} color='black' name='Safety' size={20} />
      )}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;
