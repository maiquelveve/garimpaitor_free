import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import styles from '../../../../../styles';

export default function ButtonForm({ formik, loading }) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesViewsPagesFormItem}>
        <Button
          color={colors.primaryApp.main}
          mode='contained'
          loading={loading}
          disabled={formik.isSubmitting}
          style={styles.stylesViewsPagesFormButton}
          labelStyle={styles.stylesViewsPagesFormButtonlabel}
          onPress={formik.handleSubmit}
        >
          Salvar
        </Button>
      </View>
    </>
  );
}
