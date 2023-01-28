import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useTheme, Button, Text } from 'react-native-paper';

import styles from '../../../styles';

export default function ButtonForm({ formik, loading }) {
  const natigation = useNavigation()
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesSignUpFormItem}>
        <Button
          color={colors.primaryApp.main}
          mode='contained'
          loading={loading}
          disabled={formik.isSubmitting || !formik.values.policy}
          style={styles.stylesSignUpFormButton}
          labelStyle={styles.stylesSignUpFormButtonlabel}
          onPress={formik.handleSubmit}
        >
          Salvar
        </Button>
        <View style={styles.stylesSignUpFormButtonViewAccessLogin} >
          <Text style={styles.stylesSignUpFormButtonTextAccessLogin}>
            Já possui uma conta?
          </Text>
          <Button
            uppercase={false}
            color={colors.primaryApp.main}
            labelStyle={{ fontFamily: 'Montserrat_700Bold_Italic' }}
            onPress={() => natigation.navigate('Login')}
          >
            Entrar
          </Button>
        </View>
      </View>
    </>
  );
}
