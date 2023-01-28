import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import styles from '../../../../../styles';

export default function ButtonForm({ loading, handleSave }) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesChangePermissionFormItem}>
        <Button
          color={colors.primaryApp.main}
          mode='contained'
          loading={loading}
          disabled={loading}
          style={styles.stylesChangePermissionFormButton}
          labelStyle={styles.stylesChangePermissionFormButtonlabel}
          onPress={handleSave}
        >
          Salvar
        </Button>
      </View>
    </>
  );
}
