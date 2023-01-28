import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '../../contexts/authContext';

import styles from '../../styles';

export default function CustomDrawer(props) {
  const { userCurrent } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.stylesCustomDrawerContainerView}>
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.stylesCustomDrawerImageLogo}
          resizeMode="contain"
        />
        <Text style={styles.stylesCustomDrawerTextWellcome} >
          Bem vindo!
        </Text>
        <Text style={styles.stylesCustomDrawerTextUserName} >
          {userCurrent?.name.toUpperCase()}
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
