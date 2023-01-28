import { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useMutation } from '@apollo/client'
import { CHANGE_PASSWORD } from '../../../../graphql/users/mutation';

import Layout from '../../../../components/Layout';
import AlertCatchSystem from '../../../../components/AlertCatchSystem';
import SnackbarAlert from '../../../../components/SnackbarAlert';

import styles from '../../../../styles';

import { useAuth } from '../../../../contexts/authContext';

import Form from './Form';
import ButtonForm from './ButtonForm';

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [configSnackbar, setConfigSnackbar] = useState({});
  const { userCurrent } = useAuth()

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* CREATE USERS  ***********/
  const options = {
    onCompleted() {
      setConfigSnackbar({
        type: 'success',
        textMsg: 'Senha alterada com Sucesso!'
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
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, options);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repetNewPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup
        .string()
        .max(150, 'Senha Atual não pode ser maior de 100 caracteres')
        .min(5, 'Senha Atual deve ter no mímino 6 caracteres')
        .required('Senha Atual é obrigatório'),
      newPassword: Yup
        .string()
        .max(150, 'Nova Senha não pode ser maior de 100 caracteres')
        .min(5, 'Nova Senha deve ter no mímino 6 caracteres')
        .required('Nova Senha é obrigatório'),
      repetNewPassword: Yup
        .string()
        .required('Repita Nova Senha é obrigatório')
        .oneOf([Yup.ref('newPassword'), null], 'Nova Senha diferente do Repita Senha'),
    }),
    onSubmit: async (values) => {
      try {
        const { currentPassword, newPassword } = values;
        const variables = { id: userCurrent.id, currentPassword, newPassword }
        const returnedDataSuccessfully = await changePassword({ variables });

        if (returnedDataSuccessfully.data) {
          values.currentPassword = "";
          values.newPassword = "";
          values.repetNewPassword = "";
        }
      } catch (error) {
        AlertCatchSystem();
      }
    }
  });

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesChangePasswordContainer}>
        <View style={styles.stylesChangePasswordTitleHeader}>
          <Text style={styles.stylesChangePasswordTitle}>Trocar Senha</Text>
          <Text style={styles.stylesChangePasswordSubtitle}>Atualize sua senha</Text>
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
