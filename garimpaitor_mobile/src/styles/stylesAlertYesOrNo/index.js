import theme from "../../theme";

export const stylesAlertYesOrNoIcon = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  width: '100%',
}

export const stylesAlertYesOrNoIconError = {
  backgroundColor: theme.colors.errorAlertApp.main,
}

export const stylesAlertYesOrNoIconSuccess = {
  backgroundColor: theme.colors.successAlertApp.main,
}

export const stylesAlertYesOrNoIconWarning = {
  backgroundColor: theme.colors.warningApp.main,
}

export const stylesAlertYesOrNoIconInfo = {
  backgroundColor: theme.colors.infoApp.main,
}

export const stylesAlertYesOrNoContainer = {
  backgroundColor: theme.colors.whiteApp.main,
}

export const stylesAlertYesOrNoTextTitle = {
  marginTop: -15,
  marginBottom: 25,
  fontFamily: 'Montserrat_700Bold_Italic',
  fontSize: 20
}

export const stylesAlertYesOrNoText = {
  marginBottom: 52,
  fontSize: 13,
  color: theme.colors.textApp.main,
  fontFamily: 'Montserrat_500Medium'
}

export const stylesAlertYesOrNoViewButton = {
  flexDirection: 'row',
}

export const stylesAlertYesOrNoButton = {
  marginBottom: 15,
  marginHorizontal: 20,
  borderRadius: 10
}

export const stylesAlertYesOrNoButtonLabel = {
  fontWeight: 'bold'
}
