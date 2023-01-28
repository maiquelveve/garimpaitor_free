import styles from '../styles';
import theme from '../theme';

const { colors } = theme;

export const screenOptions = {
  headerShown: false,
  drawerStyle: {
    backgroundColor: colors.drawerBackground.main
  },
  drawerActiveTintColor: colors.secondaryApp.main,
  drawerActiveBackgroundColor: colors.drawerActiveBackgroundColor.main,
  drawerInactiveTintColor: colors.inactiveTint.main,
  drawerItemStyle: {
    marginVertical: 5,
  },
  drawerLabelStyle: { ...styles.stylesDrawerLabelStyleDrawerItem }
}
