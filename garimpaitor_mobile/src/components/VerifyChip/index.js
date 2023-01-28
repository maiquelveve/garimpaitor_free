import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import styles from '../../styles';

export default function VerifyChip() {
  return (
    <View style={styles.stylesChipsVerifyContainer}>
      <View style={styles.stylesChipsVerifyChipApp} >
        <Text style={styles.stylesChipsVerifyChipAppText} >
          PENDENTE
        </Text >
      </View>
    </View>
  )
}
