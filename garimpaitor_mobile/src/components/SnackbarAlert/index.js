import React from 'react';
import { Snackbar, useTheme, Text } from 'react-native-paper'

import styles from '../../styles';

export default function SnackbarAlert({ open, onClosed, configSnackbar }) {
  const { colors } = useTheme();

  const color = configSnackbar.type.toUpperCase() === 'SUCCESS' ? colors.successAlertApp.main : colors.errorAlertApp.main
  const title = configSnackbar.type.toUpperCase() === 'SUCCESS' ? "SUCESSO!" : "ERRO!"
  const msgResult = configMessage(configSnackbar);

  return (
    <Snackbar
      visible={open}
      onDismiss={onClosed}
      duration={3000}
      action={{ label: 'X' }}
      wrapperStyle={{ ...styles.stylesSnackbarWrapperStyle, zIndex: configSnackbar.zIndex }}
      theme={{
        colors: {
          onSurface: color,
          accent: colors.whiteApp.main
        },
      }}
    >
      <Text variant="bodyLarge" style={styles.stylesSnackbarTitleHeader} >
        {title + '\n\n'}
      </Text>
      {msgResult.map((msg, index) =>
        <Text variant="bodySmall" style={{ ...styles.stylesSnackbarmsgText }} key={index} >
          - {msg + '\n'}
        </Text>
      )}
    </Snackbar>
  );
}

function configMessage(configSnackbar) {
  if (configSnackbar.error) {
    const { graphQLErrors, networkError } = configSnackbar.error;

    if (networkError) {
      return [process.env.NEXT_PUBLIC_MESSAGE_ERROR_500]
    }

    if (graphQLErrors) {
      return graphQLErrors.map(objError => objError.extensions.exception.description_pt);
    }
  }

  if (configSnackbar.textMsgArray) {
    return configSnackbar.textMsgArray;
  }

  return [configSnackbar.textMsg];
}