import { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useLazyQuery } from '@apollo/client'
import { LOGIN } from '../../../graphql/users/query';

import Layout from '../../../components/Layout';
import SnackbarAlert from '../../../components/SnackbarAlert';
import AlertCatchSystem from '../../../components/AlertCatchSystem';
import { useAuth } from '../../../contexts/authContext';

import styles from '../../../styles';

import Form from './Form';
import ButtonForm from './ButtonForm';

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const [configSnackbar, setConfigSnackbar] = useState({});
  const navigation = useNavigation();
  const { setLoggedUser } = useAuth();


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* SIGNIN USERS  ***********/
  const options = {
    onCompleted(data) {
      setLoggedUser(data.login)
      navigation.navigate('Inicio');
    },
    onError(error) {
      setConfigSnackbar({
        error,
        type: 'ERROR',
      });
      setOpen(true);
    }
  };
  const [login, { loading }] = useLazyQuery(LOGIN, options);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Email Invalido')
        .max(150, 'Email não pode ser maior de 150 caracteres')
        .min(8, 'Email deve ter no mímino 8 caracteres')
        .required('Email é obrigatório'),
      password: Yup
        .string()
        .max(150, 'Senha não pode ser maior de 100 caracteres')
        .min(5, 'Senha deve ter no mímino 6 caracteres')
        .required('Senha é obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const variables = { email, password }
        await login({ variables });

      } catch (error) {
        AlertCatchSystem();
      }
    }
  });

  return (
    <Layout>
      <View style={styles.stylesSignInContainer}>
        <View style={styles.stylesSignInTitleHeader}>
          <Text style={styles.stylesSignInTitle}>Entrar</Text>
          <Text style={styles.stylesSignInSubtitle}>Esqueci Minha Senha</Text>
        </View>
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <Form formik={formik} />
        <ButtonForm formik={formik} loading={loading} />
      </View>
    </Layout>
  );
}
