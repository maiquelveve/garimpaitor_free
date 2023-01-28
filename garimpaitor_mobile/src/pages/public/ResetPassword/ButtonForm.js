import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import styles from '../../../styles';

export default function ButtonForm({ formik, loading }) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesResetPasswordFormItem}>
        <Button
          color={colors.primaryApp.main}
          mode='contained'
          loading={loading}
          disabled={formik.isSubmitting}
          style={styles.stylesResetPasswordFormButton}
          labelStyle={styles.stylesResetPasswordFormButtonlabel}
          onPress={formik.handleSubmit}
        >
          Enviar
        </Button>
      </View>
    </>
  );
}
