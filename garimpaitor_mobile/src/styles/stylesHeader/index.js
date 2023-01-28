import theme from "../../theme";

export const styleHeaderContainerSafeAreaView = {
  borderBottomColor: theme.colors.inactiveTint.main,
  borderTopColor: theme.colors.inactiveTint.main,
  borderBottomWidth: 2.2,
  borderTopWidth: 0.8,
  backgroundColor: theme.colors.backgroundApp.paper,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  elevaton: 2,
}

export const styleHeaderContainerView = {
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 8,
  width: '100%',
  height: 60,
  flexDirection: 'row',
}

// USAR ESSE SE FOR FAZER O NOME DO DAER POR IMGEM
export const styleHeaderIconLogo = {
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '30%',
  padding: 10,
  width: 40,
  height: 40,
}

export const styleHeaderButtonMenuDrawer = {
  justifyContent: 'center',
  alignItems: 'center',
}

export const styleHeaderButtonMenuAction = {
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 8
}

export const styleHeaderDividerMenuAction = {
  backgroundColor: theme.colors.dividerApp,
  height: 1,
}
