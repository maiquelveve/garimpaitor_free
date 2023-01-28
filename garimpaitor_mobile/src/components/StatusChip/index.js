import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import styles from '../../styles';

export default function StatusChip({ status }) {
  const { colors } = useTheme();

  return (
    <View style={styles.stylesChipsStatusContainer}>
      <View
        style={{
          ...styles.stylesChipsStatusChipApp,
          backgroundColor: status ? colors.greenApp.main : colors.redApp.main
        }}
      >
        <Text style={styles.stylesChipsStatusChipAppText} >
          {status ? 'ATIVO' : 'INATIVO'}
        </Text >
      </View>
    </View>
  )
}