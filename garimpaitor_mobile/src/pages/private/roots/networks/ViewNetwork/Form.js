import { View } from 'react-native';
import { Text } from 'react-native-paper';

import StatusChip from '../../../../../components/StatusChip';
import VerifyChip from '../../../../../components/VerifyChip';

import styles from '../../../../../styles';

export default function Form({ network }) {

  return (
    <View style={{ marginBottom: 25, marginTop: 18 }}>
      <View style={styles.stylesViewsPagesFormItem}>
        <View style={styles.stylesViewsPagesBackgroundItem} >
          <Text style={styles.stylesViewsPagesTextItem} >
            {network.name}
          </Text>
        </View>
      </View>
      <View style={styles.stylesViewsPagesFormItem}>
        <View style={styles.stylesViewsPagesStatusViewItem} >
          <StatusChip status={network.status} />
          {!network.verified &&
            <VerifyChip status={network.status} />
          }
        </View>
      </View>
    </View>
  );
}
