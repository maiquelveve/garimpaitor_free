import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import styles from '../../styles';

export default function CardSubTitleVerify() {
  return (
    <View style={styles.stylesListsSystemCradSubTitleVerifyContainer}>
      <View style={styles.stylesListsSystemCradSubTitleVerifyChipApp} >
        <Text style={styles.stylesListsSystemCradSubTitleVerifyChipAppText} >
          PENDENTE
        </Text >
      </View>
    </View>
  )
}
