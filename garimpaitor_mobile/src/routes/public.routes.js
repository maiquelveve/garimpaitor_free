import { useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';

import CustomDrawer from '../components/CustomDrawer';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions } from './configDrawer';

import SignIn from '../pages/public/SignIn';
import SignUp from '../pages/public/SignUp';
import Home from '../pages/public/Home';
import ResetPassword from '../pages/public/ResetPassword';

const PublicDrawer = createDrawerNavigator();
const PublicStack = createStackNavigator();

function AppRoutesDrawer() {
  const { colors } = useTheme();

  return (
    <PublicDrawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={screenOptions}
    >
      <PublicDrawer.Screen
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
      <PublicDrawer.Screen
        name='Login'
        component={SignIn}
        options={{
          drawerIcon: ({ focused }) =>
            <FontAwesome5
              name="user-lock"
              size={20}
              color={focused ? colors.secondaryApp.main : colors.inactiveTint.main}
            />
        }}
      />
      <PublicDrawer.Screen
        name='Cadastrar'
        component={SignUp}
        options={{
          drawerIcon: ({ focused }) =>
            <FontAwesome5
              name="user-plus"
              size={20}
              color={focused ? colors.secondaryApp.main : colors.inactiveTint.main}
            />
        }}
      />
    </PublicDrawer.Navigator>
  )
}

function AppRoutes() {
  return (
    <PublicStack.Navigator>
      <PublicStack.Screen
        name='Home'
        component={AppRoutesDrawer}
        options={{
          headerShown: false
        }}
      />
      <PublicStack.Screen
        name='ResetPassword'
        component={ResetPassword}
      />
    </PublicStack.Navigator>
  )
}

export default AppRoutes;
