import { useState } from 'react';
import { View } from 'react-native';
import { useTheme, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome, Feather, MaterialIcons, Fontisto } from '@expo/vector-icons'

import AlertYesOrNo from '../../../../../../../components/AlertYesOrNo';

import styles from '../../../../../../../styles';

export default function MenusActions({
  marketplace,
  loadingActions,
  activateMarketplace,
  deactivateMarketplace,
  addMarketplaceUser,
  disableMarketplaceUser,
  activateMarketplaceUser,
}) {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [openActivate, setOpenActivate] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openAddMarketplaceUser, setOpenAddMarketplaceUser] = useState(false);
  const [openDisableMarketplaceUser, setOpenDisableMarketplaceUser] = useState(false);
  const [openActivateMarketplaceUser, setOpenActivateMarketplaceUser] = useState(false);

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

  const handleCloseAddMarketplaceUser = () => {
    setOpenAddMarketplaceUser(false);
    closeMenu();
  }

  const handleCloseDisableMarketplaceUser = () => {
    setOpenDisableMarketplaceUser(false);
    closeMenu();
  }

  const handleCloseActivateMarketplaceUser = () => {
    setOpenActivateMarketplaceUser(false);
    closeMenu();
  }

  const handleActivateMarketplace = () => {
    activateMarketplace(marketplace.id);
  }

  const handleDeactivateMarketplace = () => {
    deactivateMarketplace(marketplace.id);
  }

  const handleAddMarketplaceUser = () => {
    addMarketplaceUser(marketplace.id);
  }

  const handleDisableMarketplaceUser = () => {
    disableMarketplaceUser(marketplace.id);
  }

  const handleActivateMarketplaceUser = () => {
    activateMarketplaceUser(marketplace.id);
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
          borderColor: marketplace.status ? colors.greenApp.main : colors.redApp.main
        }}
      >
        <View>
          <Menu.Item
            icon={() => <MaterialCommunityIcons name="eye" size={23} color={colors.warningApp.dark} />}
            onPress={() => {
              navigation.navigate('ViewMarketplace', { id: marketplace.id });
              closeMenu();
            }}
            title="Visualizar"
            titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
          />
          <Menu.Item
            icon={() => <MaterialIcons name="edit" size={23} color={colors.greenApp.main} />}
            onPress={() => {
              navigation.navigate('EditMarketplace', { id: marketplace.id });
              closeMenu();
            }} add
            title="Editar"
            titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
          />
          {!marketplace.status ? <></> :
            marketplace.isMyMarketplace ?
              marketplace.marketplaceUserStatus ?
                <Menu.Item
                  icon={() => <MaterialIcons name="remove-moderator" size={23} color={colors.errorAlertApp.main} />}
                  onPress={() => setOpenDisableMarketplaceUser(true)}
                  title="Remover"
                  titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
                />
                :
                <Menu.Item
                  icon={() => <MaterialIcons name="add-moderator" size={23} color={colors.infoApp.main} />}
                  onPress={() => setOpenActivateMarketplaceUser(true)}
                  title="Re-Ativar"
                  titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
                />
              :
              <Menu.Item
                icon={() => <MaterialIcons name="add-business" size={23} color={colors.infoApp.main} />}
                onPress={() => setOpenAddMarketplaceUser(true)}
                title="Adicionar"
                titleStyle={styles.stylesListsSystemMenuActionsTitleStyleText}
              />
          }
          {marketplace.status ?
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
        callback={handleActivateMarketplace}
        message={`Ativar o mercado ${marketplace.brand.name} - ${marketplace.city.name}`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
      <AlertYesOrNo
        visible={openDeactivate}
        handleClosed={handleCloseDeactivate}
        callback={handleDeactivateMarketplace}
        message={`Desativar o mercado ${marketplace.brand.name} - ${marketplace.city.name}`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
      <AlertYesOrNo
        visible={openAddMarketplaceUser}
        handleClosed={handleCloseAddMarketplaceUser}
        callback={handleAddMarketplaceUser}
        message={`Adicionar o mercado ${marketplace.brand.name} - ${marketplace.city.name} para você?`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
      <AlertYesOrNo
        visible={openDisableMarketplaceUser}
        handleClosed={handleCloseDisableMarketplaceUser}
        callback={handleDisableMarketplaceUser}
        message={`Desabilitar o mercado ${marketplace.brand.name} - ${marketplace.city.name} de você?`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
      <AlertYesOrNo
        visible={openActivateMarketplaceUser}
        handleClosed={handleCloseActivateMarketplaceUser}
        callback={handleActivateMarketplaceUser}
        message={`Re-ativar o mercado ${marketplace.brand.name} - ${marketplace.city.name} de você?`}
        showTitle={true}
        type="info"
        loading={loadingActions}
      />
    </>
  );
}
