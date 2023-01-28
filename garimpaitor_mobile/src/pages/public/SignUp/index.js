import { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../../graphql/users/mutation';

import Layout from '../../../components/Layout';
import AlertCatchSystem from '../../../components/AlertCatchSystem';
import SnackbarAlert from '../../../components/SnackbarAlert';

import styles from '../../../styles';

import Form from './Form';
import ButtonForm from './ButtonForm';

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const [configSnackbar, setConfigSnackbar] = useState({});

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* CREATE USERS  ***********/
  const options = {
    onCompleted() {
      setConfigSnackbar({
        type: 'success',
        textMsg: 'Usuário Cadastrado com Sucesso!'
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
  const [createUser, { loading }] = useMutation(CREATE_USER, options);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      policy: true,
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Email Invalido')
        .max(150, 'Email não pode ser maior de 150 caracteres')
        .min(8, 'Email deve ter no mímino 8 caracteres')
        .required('Email é obrigatório'),
      name: Yup
        .string()
        .max(150, 'Nome não pode ser maior de 150 caracteres')
        .min(3, 'Nome deve ter no mímino 3 caracteres')
        .required('Nome é obrigatório'),
      password: Yup
        .string()
        .max(150, 'Senha não pode ser maior de 100 caracteres')
        .min(5, 'Senha deve ter no mímino 6 caracteres')
        .required('Senha é obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        const { name, email, password } = values;
        const variables = { name, email, password }
        const returnedDataSuccessfully = await createUser({ variables });

        if (returnedDataSuccessfully.data) {
          values.name = "";
          values.email = "";
          values.password = "";
        }
      } catch (error) {
        AlertCatchSystem();
      }
    }
  });

  return (
    <Layout>
      <View style={styles.stylesSignUpContainer}>
        <View style={styles.stylesSignUpTitleHeader}>
          <Text style={styles.stylesSignUpTitle}>Criar nova conta</Text>
          <Text style={styles.stylesSignUpSubtitle}>Informe os dados do usuario</Text>
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
