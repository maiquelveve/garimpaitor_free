import { useState } from 'react';
import { View } from 'react-native';
import { useTheme, Menu, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

import { useAuth } from '../../../contexts/authContext';
import styles from '../../../styles';

export default function MenusComponent() {
  const { colors } = useTheme();
  const { logout, isLogged } = useAuth();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  if (!isLogged) {
    return (
      <MaterialIcons
        style={styles.styleHeaderButtonMenuAction}
        name="lock"
        color={colors.icon.main}
        size={28}
        onPress={() => navigation.navigate('Login')}
      />
    )
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <MaterialIcons
          style={styles.styleHeaderButtonMenuAction}
          name="app-settings-alt"
          color={colors.icon.main}
          size={30}
          onPress={openMenu}
        />
      }
    >
      <View>
        <Menu.Item
          icon={() => <FontAwesome5 name="user-cog" size={22} />}
          onPress={() => {
            navigation.navigate('Profile');
            closeMenu();
          }}
          title="Perfil"
        />
        <Menu.Item
          icon={() => <MaterialCommunityIcons name="lock-reset" size={25} />}
          onPress={() => {
            navigation.navigate('ChangePassword');
            closeMenu();
          }}
          title="Troca Senha"
        />
        <Divider style={styles.styleHeaderDividerMenuAction} />
        <Menu.Item
          icon={() => <MaterialIcons name="logout" size={25} />}
          onPress={logout}
          title="Sair"
        />
      </View>
    </Menu>
  );
}