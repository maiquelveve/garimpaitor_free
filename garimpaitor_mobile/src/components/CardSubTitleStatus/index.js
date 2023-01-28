import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import styles from '../../styles';

export default function CradSubTitleStatus({ status }) {
  const { colors } = useTheme();

  return (
    <View style={styles.stylesListsSystemCradSubTitleStatusContainer}>
      <View
        style={{
          ...styles.stylesListsSystemCradSubTitleStatusChipApp,
          backgroundColor: status ? colors.greenApp.main : colors.redApp.main
        }}
      >
        <Text style={styles.stylesListsSystemCradSubTitleStatusChipAppText} >
          {status ? 'ATIVO' : 'INATIVO'}
        </Text >
      </View>
    </View>
  )
}