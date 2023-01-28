import { useState } from 'react';
import { View } from 'react-native';
import { useTheme, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

import AlertYesOrNo from '../../../../../../../components/AlertYesOrNo';

import styles from '../../../../../../../styles';

export default function MenusActions({ user, loadingActions, activateUser, deactivateUser }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [openActivate, setOpenActivate] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleCloseActivate = () => {
    setOpenActivate(false);
    closeMenu();
  }

  const handleCloseDeactivate = () => {
    setOpenDeactivate(false);
    closeMenu();
  }

  const handleActivateUser = () => {
    activateUser(user.id);
  }

  const handleDeactivateUser = async () => {
    deactivateUser(user.id);
  }

  return (
    <>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <FontAwesome5
            name="user-cog"
            size={20}
            color={colors.icon.main}
            onPress={openMenu}
          />
        }
        anchorPosition="bottom"
        contentStyle={{
          ...styles.stylesListsSystemMenuActions,
          borderColor: user.status ? colors.greenApp.main : colors.redApp.main
        }}
      >
        <View>
          <Menu.Item
            icon={() => <MaterialCommunityIcons name="account-eye" size={23} color={colors.warningApp.dark} />}
            onPress={() => {
              navigation.navigate('ViewUser', { user });
              closeMenu();
            }}
            title="Visualizar"
            titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
          />
          {user.status ?
            <>
              <Menu.Item
                icon={() => <MaterialIcons name="engineering" size={23} color={colors.greenApp.main} />}
                onPress={() => {
                  navigation.navigate('UserChangePermission', { user });
                  closeMenu();
                }}
                title="Trocar Acesso"
                titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
              />
              <Menu.Item
                icon={() => <MaterialCommunityIcons name="account-cancel" size={23} color={colors.redApp.main} />}
                onPress={() => setOpenDeactivate(true)}
                title="Desativar"
                titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
              />
            </>
            :
            <Menu.Item
              icon={() => <MaterialCommunityIcons name="account-check" size={23} color={colors.icon.blue} />}
              onPress={() => setOpenActivate(true)}
              title="Ativar"
              titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
            />
          }
        </View>
      </Menu>
      <AlertYesOrNo
        visible={openActivate}
        handleClosed={handleCloseActivate}
        callback={handleActivateUser}
        message={`Ativar o usuário ${user.name}`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
      <AlertYesOrNo
        visible={openDeactivate}
        handleClosed={handleCloseDeactivate}
        callback={handleDeactivateUser}
        message={`Desativar o usuário ${user.name}`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
    </>
  );
}
