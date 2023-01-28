import { MaterialIcons } from '@expo/vector-icons';

const getTabBarIcon = (route, focused, colors) => {
  if (route.key === 'marketplace')
    return <MaterialIcons name="local-grocery-store" size={25} color={focused ? colors.primaryApp.main : colors.icon.main} />

  if (route.key === 'group')
    return <MaterialIcons name="apartment" size={25} color={focused ? colors.primaryApp.main : colors.icon.main} />

  if (route.key === 'addressInitial')
    return <MaterialIcons name="add-location-alt" size={25} color={focused ? colors.primaryApp.main : colors.icon.main} />

  if (route.key === 'address')
    return <MaterialIcons name="edit-location" size={25} color={focused ? colors.primaryApp.main : colors.icon.main} />

  if (route.key === 'action')
    return <MaterialIcons name="file-download-done" size={25} color={focused ? colors.primaryApp.main : colors.icon.main} />

}

export default getTabBarIcon;
