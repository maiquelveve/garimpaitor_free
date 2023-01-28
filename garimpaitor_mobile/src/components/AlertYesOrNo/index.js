import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';

import styles from '../../styles';
import AlertCatchSystem from '../AlertCatchSystem';

export default function AlertYesOrNo(props) {
  const { colors } = useTheme();
  const {
    visible,
    handleClosed,
    callback,
    message,
    loading = false,
    showTitle = false,
    type = "ERROR",
    title = "ATENÇÃO",
    labelTextBtnYes = "SIM",
    labelTextBtnNo = "NÃO",
  } = props

  const typeConfig = getTypeConfig(type);

  const handleCallback = useCallback(async () => {
    try {
      await callback();
      setTimeout(handleClosed, 300);

    } catch (error) {
      AlertCatchSystem();
    }
  }, []);

  return (
    <FancyAlert
      visible={visible}
      icon={
        <View
          style={[styles.stylesAlertYesOrNoIcon, typeConfig.style]}
        >
          <Text>
            {typeConfig.icon}
          </Text>
        </View>
      }
      style={styles.stylesAlertYesOrNoContainer}
    >
      {showTitle &&
        <Text
          style={styles.stylesAlertYesOrNoTextTitle}
        >
          {title}
        </Text>
      }
      <Text
        style={styles.stylesAlertYesOrNoText}
      >
        {message}
      </Text>
      <View
        style={styles.stylesAlertYesOrNoViewButton}
      >
        <Button
          color={colors.successAlertApp.main}
          mode='contained'
          style={styles.stylesAlertYesOrNoButton}
          labelStyle={styles.stylesAlertYesOrNoButtonLabel}
          onPress={handleCallback}
          loading={loading}
          disabled={loading}
        >
          {labelTextBtnYes}
        </Button>
        <Button
          color={colors.errorAlertApp.main}
          mode='contained'
          style={styles.stylesAlertYesOrNoButton}
          labelStyle={styles.stylesAlertYesOrNoButtonLabel}
          onPress={handleClosed}
          disabled={loading}
        >
          {labelTextBtnNo}
        </Button>
      </View>
    </FancyAlert>
  );
}

function getTypeConfig(type) {
  let config = {
    style: styles.stylesAlertYesOrNoIconError,
    icon: <MaterialIcons name="close" size={24} color="white" />
  }

  switch (type.toUpperCase()) {
    case 'ERROR':
      config = {
        style: styles.stylesAlertYesOrNoIconError,
        icon: <MaterialIcons name="close" size={24} color="white" />
      }
      break;

    case 'SUCCESS':
      config = {
        style: styles.stylesAlertYesOrNoIconSuccess,
        icon: <Entypo name="check" size={24} color="white" />
      }
      break;

    case 'WARNING':
      config = {
        style: styles.stylesAlertYesOrNoIconWarning,
        icon: <FontAwesome5 name="exclamation" size={24} color="white" />
      }
      break;

    case 'INFO':
      config = {
        style: styles.stylesAlertYesOrNoIconInfo,
        icon: <FontAwesome5 name="info" size={24} color="white" />
      }
      break;
  }

  return config;
}