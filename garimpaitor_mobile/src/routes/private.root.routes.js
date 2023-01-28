import { useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesome5 } from '@expo/vector-icons';

import { screenOptions } from './configDrawer';
import CustomDrawer from '../components/CustomDrawer';

import ChangePassword from '../pages/private/general/ChangePassword';
import Profile from '../pages/private/general/Profile';
import Home from '../pages/private/general/Home';

import UsersList from '../pages/private/roots/users/UsersList';
import UserChangePermission from '../pages/private/roots/users/UserChangePermission';
import ViewUser from '../pages/private/roots/users/ViewUser';

import NetworkList from '../pages/private/roots/networks/NetworkList';
import ViewNetwork from '../pages/private/roots/networks/ViewNetwork';
import CreateNetwork from '../pages/private/roots/networks/CreateNetwork';
import EditNetwork from '../pages/private/roots/networks/EditNetwork';

import BrandList from '../pages/private/roots/brands/BrandList';
import CreateBrand from '../pages/private/roots/brands/CreateBrand';
import ViewBrand from '../pages/private/roots/brands/ViewBrand';
import EditBrand from '../pages/private/roots/brands/EditBrand';

import MarketplaceList from '../pages/private/roots/marketplaces/MarketplaceList';
import CreateMarketplace from '../pages/private/roots/marketplaces/CreateMarketplace';
import EditMarketplace from '../pages/private/roots/marketplaces/EditMarketplace';
import ViewMarketplace from '../pages/private/roots/marketplaces/ViewMarketplace';

const PrivateDrawer = createDrawerNavigator();
const PrivateStack = createStackNavigator();

function AppRoutesDrawer() {
  const { colors } = useTheme();

  return (
    <>
      <PrivateDrawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={screenOptions}
      >
        <PrivateDrawer.Screen
          name='Inicio'
          component={Home}
          options={{
            drawerIcon: ({ focused }) =>
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? colors.secondaryApp.main : colors.inactiveTint.main}
              />
          }}
        />
        <PrivateDrawer.Screen
          name='Usuários'
          component={UsersList}
          options={{
            drawerIcon: ({ focused }) =>
              <FontAwesome5
                name="users"
                size={20}
                color={focused ? colors.secondaryApp.main : colors.inactiveTint.main}
              />
          }}
        />
        <PrivateDrawer.Screen
          name='Rede'
          component={NetworkList}
          options={{
            drawerIcon: ({ focused }) =>
              <FontAwesome5
                name="sitemap"
                size={20}
                color={focused ? colors.secondaryApp.main : colors.inactiveTint.main}
              />
          }}
        />
        <PrivateDrawer.Screen
          name='Marca'
          component={BrandList}
          options={{
            drawerIcon: ({ focused }) =>
              <FontAwesome5
                name="list"
                size={20}
                color={focused ? colors.secondaryApp.main : colors.inactiveTint.main}
              />
          }}
        />
        <PrivateDrawer.Screen
          name='Mercados'
          component={MarketplaceList}
          options={{
            drawerIcon: ({ focused }) =>
              <FontAwesome5
                name="building"
                size={20}
                color={focused ? colors.secondaryApp.main : colors.inactiveTint.main}
              />
          }}
        />
      </PrivateDrawer.Navigator>
    </>
  )
}

function AppRoutes() {
  return (
    <PrivateStack.Navigator>
      {/* ROUTES GENERAL */}
      <PrivateStack.Screen
        name='Home'
        component={AppRoutesDrawer}
        options={{
          headerShown: false
        }}
      />


      {/* ROUTES USERS */}
      <PrivateStack.Screen
        name='Profile'
        options={{
          title: 'Perfil'
        }}
        component={Profile}
      />
      <PrivateStack.Screen
        name='UserChangePermission'
        options={{
          title: 'Trocar Acesso'
        }}
        component={UserChangePermission}
      />
      <PrivateStack.Screen
        name='ChangePassword'
        options={{
          title: 'Trocar Senha'
        }}
        component={ChangePassword}
      />
      <PrivateStack.Screen
        name='ViewUser'
        options={{
          title: 'Visualizar Usuário'
        }}
        component={ViewUser}
      />


      {/* ROUTES NETWORKS */}
      <PrivateStack.Screen
        name='ViewNetwork'
        options={{
          title: 'Visualizar Rede'
        }}
        component={ViewNetwork}
      />
      <PrivateStack.Screen
        name='CreateNetwork'
        options={{
          title: 'Cadastrar Rede'
        }}
        component={CreateNetwork}
      />
      <PrivateStack.Screen
        name='EditNetwork'
        options={{
          title: 'Editar Rede'
        }}
        component={EditNetwork}
      />

      {/* ROUTES BRANDS */}
      <PrivateStack.Screen
        name='ViewBrand'
        options={{
          title: 'Visualizar Marca'
        }}
        component={ViewBrand}
      />
      <PrivateStack.Screen
        name='CreateBrand'
        options={{
          title: 'Cadastrar Marca'
        }}
        component={CreateBrand}
      />
      <PrivateStack.Screen
        name='EditBrand'
        options={{
          title: 'Editar Marca'
        }}
        component={EditBrand}
      />

      {/* ROUTES MARKETPLACES */}
      <PrivateStack.Screen
        name='CreateMarketplace'
        options={{
          title: 'Cadastrar Mercado'
        }}
        component={CreateMarketplace}
      />
      <PrivateStack.Screen
        name='EditMarketplace'
        options={{
          title: 'Editar Mercado'
        }}
        component={EditMarketplace}
      />
      <PrivateStack.Screen
        name='ViewMarketplace'
        options={{
          title: 'Visualizar Mercado'
        }}
        component={ViewMarketplace}
      />
    </PrivateStack.Navigator>
  )
}

export default AppRoutes;
