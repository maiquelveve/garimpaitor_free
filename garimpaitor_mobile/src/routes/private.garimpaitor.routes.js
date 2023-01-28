import { useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesome5 } from '@expo/vector-icons';

import { screenOptions } from './configDrawer';
import CustomDrawer from '../components/CustomDrawer';

import ChangePassword from '../pages/private/general/ChangePassword';
import Profile from '../pages/private/general/Profile';
import Home from '../pages/private/general/Home';

import NetworkList from '../pages/private/garimpaitor/networks/NetworkList';
import ViewNetwork from '../pages/private/garimpaitor/networks/ViewNetwork';
import CreateNetwork from '../pages/private/garimpaitor/networks/CreateNetwork';

import BrandList from '../pages/private/garimpaitor/brands/BrandList';
import CreateBrand from '../pages/private/garimpaitor/brands/CreateBrand';
import ViewBrand from '../pages/private/garimpaitor/brands/ViewBrand';

import MarketplaceList from '../pages/private/garimpaitor/marketplaces/MarketplaceList';
import CreateMarketplace from '../pages/private/garimpaitor/marketplaces/CreateMarketplace';
import ViewMarketplace from '../pages/private/garimpaitor/marketplaces/ViewMarketplace';

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
        component={Profile}
      />
      <PrivateStack.Screen
        name='ChangePassword'
        component={ChangePassword}
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

      {/* ROUTES MARKETPLACES */}
      <PrivateStack.Screen
        name='CreateMarketplace'
        options={{
          title: 'Cadastrar Mercado'
        }}
        component={CreateMarketplace}
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
