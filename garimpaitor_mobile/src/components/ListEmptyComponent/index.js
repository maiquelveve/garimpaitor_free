import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import styles from '../../styles';

export default function ListEmptyComponent({ msg, subMsg = "Melhore a pesquisa utilizando os filtros!", isSubMsg = false }) {

  return (
    <View style={styles.stylesListsSystemListEmptyContainer} >
      <Text style={styles.stylesListsSystemListEmptyTextMsg} >
        {msg}
      </Text>

      {isSubMsg &&
        <Text style={styles.stylesListsSystemListEmptyTextSubMsg} >
          {subMsg}
        </Text>
      }
    </View>
  );
}