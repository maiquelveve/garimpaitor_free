import { useState } from 'react';
import { View } from 'react-native';
import { useTheme, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome, Feather, MaterialIcons, Fontisto } from '@expo/vector-icons'

import AlertYesOrNo from '../../../../../../../components/AlertYesOrNo';

import styles from '../../../../../../../styles';

export default function MenusActions({ brand, loadingActions, activateBrand, deactivateBrand, verifyBrand }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [openActivate, setOpenActivate] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);

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

  const handleCloseVerify = () => {
    setOpenVerify(false);
    closeMenu();
  }

  const handleActivateBrand = () => {
    activateBrand(brand.id);
  }

  const handleDeactivateBrand = async () => {
    deactivateBrand(brand.id);
  }

  const handleVerifyBrand = () => {
    verifyBrand(brand.id);
  }

  return (
    <>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <FontAwesome
            name="gear"
            size={20}
            color={colors.icon.main}
            onPress={openMenu}
          />
        }
        anchorPosition="bottom"
        contentStyle={{
          ...styles.stylesListsSystemMenuActions,
          borderColor: brand.status ? colors.greenApp.main : colors.redApp.main
        }}
      >
        <View>
          <Menu.Item
            icon={() => <MaterialCommunityIcons name="eye" size={23} color={colors.warningApp.dark} />}
            onPress={() => {
              navigation.navigate('ViewBrand', { brand });
              closeMenu();
            }}
            title="Visualizar"
            titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
          />
          <Menu.Item
            icon={() => <MaterialIcons name="edit" size={23} color={colors.greenApp.main} />}
            onPress={() => {
              navigation.navigate('EditBrand', { brand });
              closeMenu();
            }}
            title="Editar"
            titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
          />
          {!brand.verified ?
            <Menu.Item
              icon={() => <Fontisto name="like" size={23} color={colors.infoApp.main} />}
              onPress={() => setOpenVerify(true)}
              title="Verificar"
              titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
            />
            : brand.status ?
              <Menu.Item
                icon={() => <MaterialCommunityIcons name="cancel" size={23} color={colors.redApp.main} />}
                onPress={() => setOpenDeactivate(true)}
                title="Desativar"
                titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
              />
              :
              <Menu.Item
                icon={() => <Feather name="check-circle" size={23} color={colors.icon.blue} />}
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
        callback={handleActivateBrand}
        message={`Ativar o rede ${brand.name}`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
      <AlertYesOrNo
        visible={openDeactivate}
        handleClosed={handleCloseDeactivate}
        callback={handleDeactivateBrand}
        message={`Desativar o rede ${brand.name}`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
      <AlertYesOrNo
        visible={openVerify}
        handleClosed={handleCloseVerify}
        callback={handleVerifyBrand}
        message={`Verificar o rede ${brand.name}`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
    </>
  );
}
