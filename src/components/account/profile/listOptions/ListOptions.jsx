import { useState } from 'react';
import { Icon } from 'react-native-elements';
import { Text, TouchableOpacity, View } from 'react-native';
import ChangeDisplayName from '../changeDisplayName/ChangeDisplayName';
import ChangePassword from '../changePassword/ChangePassword';
import Modal from '../../../../shared/modal/Modal';
import theme from '../../../../styles/theme';
import { styles } from './listOptions.styles';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../../utils/screen';

const ListOptions = ({ onReload }) => {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const navigation = useNavigation();

  const onCloseModal = () => setShowModal((prevState) => !prevState);

  const selectedComponent = (key) => {
    if (key === 'displayName') {
      setRenderComponent(
        <ChangeDisplayName onClose={onCloseModal} onReload={onReload} />
      );
    }
    if (key === 'password') {
      setRenderComponent(<ChangePassword onClose={onCloseModal} />);
    }
    if (key === 'favorites') {
      onCloseModal();
      setRenderComponent(navigation.navigate(screen.account.favorites));
    }
    if (key === 'misArticulos') {
      onCloseModal();
      setRenderComponent(navigation.navigate(screen.account.misArticulos));
    }

    onCloseModal();
  };

  const menuOptions = getMenuOptions(selectedComponent);

  return (
    <View>
      {menuOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          activeOpacity={0.3}
          style={styles.btn}
        >
          <Icon
            type='material-community'
            size={30}
            name={item.icon}
            color={theme.colors.grey.grey600}
          />
          <Text style={styles.text}>{item.text}</Text>
        </TouchableOpacity>
      ))}

      <Modal show={showModal} close={() => onCloseModal()}>
        {renderComponent}
      </Modal>
    </View>
  );
};

function getMenuOptions(selectedComponent) {
  return [
    {
      icon: 'account',
      text: 'Cambiar Nombre',
      onPress: () => selectedComponent('displayName'),
    },
    {
      icon: 'lock',
      text: 'Cambiar Contraseña',
      onPress: () => selectedComponent('password'),
    },
    {
      icon: 'bookmark',
      text: 'Guardados',
      onPress: () => selectedComponent('favorites'),
    },
    {
      icon: 'text-box-outline',
      text: 'Mis Articulos',
      onPress: () => selectedComponent('misArticulos'),
    },
    {
      icon: 'cog',
      text: 'Configuracion',
      onPress: () => console.log('configuracion'),
    },
  ];
}

export default ListOptions;
