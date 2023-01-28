import { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useMutation } from '@apollo/client'
import { RESET_PASSWORD } from '../../../graphql/users/mutation';

import Layout from '../../../components/Layout';
import SnackbarAlert from '../../../components/SnackbarAlert';
import AlertCatchSystem from '../../../components/AlertCatchSystem';

import styles from '../../../styles';

import Form from './Form';
import ButtonForm from './ButtonForm';

export default function ResetPassword() {
  const [open, setOpen] = useState(false);
  const [configSnackbar, setConfigSnackbar] = useState({});


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* RESET PASSWORD USERS  ***********/
  const optionsResetPassword = {
    onCompleted() {
      setConfigSnackbar({
        type: 'success',
        textMsg: 'Nova senha enviada para o email.'
      });
      setOpen(true);
    },
    onError(error) {
      setConfigSnackbar({
        error,
        type: 'ERROR',
      });
      setOpen(true);
    }
  };
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, optionsResetPassword);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Email Invalido')
        .max(150, 'Email não pode ser maior de 150 caracteres')
        .min(8, 'Email deve ter no mímino 8 caracteres')
        .required('Email é obrigatório')
    }),
    onSubmit: async (values) => {
      try {
        const { email } = values;
        const variables = { email }
        const returnedDataSuccessfully = await resetPassword({ variables });

        if (returnedDataSuccessfully.data) {
          values.email = "";
        }
      } catch (error) {
        AlertCatchSystem();
      }
    }
  });

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesResetPasswordContainer}>
        <View style={styles.stylesResetPasswordTitleHeader}>
          <Text style={styles.stylesResetPasswordTitle}>Autalizar Senha</Text>
          <Text style={styles.stylesResetPasswordSubtitle}>Nova senha será enviado para o E-mail</Text>
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
