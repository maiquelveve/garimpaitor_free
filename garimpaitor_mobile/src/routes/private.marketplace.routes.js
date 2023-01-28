import { useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesome5 } from '@expo/vector-icons';

import { screenOptions } from './configDrawer';
import CustomDrawer from '../components/CustomDrawer';

import ChangePassword from '../pages/private/general/ChangePassword';
import Profile from '../pages/private/general/Profile';
import Home from '../pages/private/general/Home';

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
      </PrivateDrawer.Navigator>
    </>
  )
}

function AppRoutes() {
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen
        name='Home'
        component={AppRoutesDrawer}
        options={{
          headerShown: false
        }}
      />
      <PrivateStack.Screen
        name='Profile'
        component={Profile}
      />
      <PrivateStack.Screen
        name='ChangePassword'
        component={ChangePassword}
      />
    </PrivateStack.Navigator>
  )
}

export default AppRoutes;
