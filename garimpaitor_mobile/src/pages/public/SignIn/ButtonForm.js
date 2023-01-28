import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useTheme, Button, Text } from 'react-native-paper';

import styles from '../../../styles';

export default function ButtonForm({ formik, loading }) {
  const { colors } = useTheme();
  const natigation = useNavigation()

  return (
    <>
      <View style={styles.stylesSignInFormItem}>
        <Button
          color={colors.primaryApp.main}
          mode='contained'
          loading={loading}
          disabled={formik.isSubmitting}
          style={styles.stylesSignInFormButton}
          labelStyle={styles.stylesSignInFormButtonlabel}
          onPress={formik.handleSubmit}
        >
          Entrar
        </Button>
        <View style={styles.stylesSignInFormButtonViewAccessLogin} >
          <Text style={styles.stylesSignInFormButtonTextAccessLogin}>
            Não é cadastrado?
          </Text>
          <Button
            uppercase={false}
            color={colors.primaryApp.main}
            labelStyle={{ fontFamily: 'Montserrat_700Bold_Italic' }}
            onPress={() => natigation.navigate('Cadastrar')}
          >
            Cadastre-se
          </Button>
        </View>
        <View style={{ ...styles.stylesSignInFormButtonViewAccessLogin, marginTop: -9 }} >
          <Text style={styles.stylesSignInFormButtonTextAccessLogin}>
            Esqueceu a senha? Clique
          </Text>
          <Button
            uppercase={false}
            color={colors.primaryApp.main}
            labelStyle={{ fontFamily: 'Montserrat_700Bold_Italic' }}
            onPress={() => natigation.navigate('ResetPassword')}
          >
            aqui
          </Button>
        </View>
      </View>
    </>
  );
}
