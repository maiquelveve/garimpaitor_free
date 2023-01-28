import { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_USER, DISABLE_USER } from '../../../../graphql/users/mutation';
import { GET_USER_BY_TOKEN } from '../../../../graphql/users/query';

import Layout from '../../../../components/Layout';
import SnackbarAlert from '../../../../components/SnackbarAlert';
import LoadingSystemSimple from '../../../../components/LoadingSystemSimple';
import AlertCatchSystem from '../../../../components/AlertCatchSystem';
import { useAuth } from '../../../../contexts/authContext';

import styles from '../../../../styles';

import Form from './Form';
import ButtonForm from './ButtonForm';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [configSnackbar, setConfigSnackbar] = useState({});
  const [userProfile, setUserProfile] = useState({});

  const { updateUserCurrent, userCurrent, logout } = useAuth();

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* GET USERS BY TOKEN  ***********/
  const optionsQueryUserByToken = {
    onCompleted(data) {
      formik.setFieldValue('name', data.getUserByToken.name);
      formik.setFieldValue('email', data.getUserByToken.email);
      setUserProfile(data.getUserByToken);
    },
    onError() {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  };
  const { loading: loadingQueryGetUserByToken } = useQuery(GET_USER_BY_TOKEN, optionsQueryUserByToken);


  /********* UPDATE USERS  ***********/
  const optionsUpdateUser = {
    onCompleted() {
      setConfigSnackbar({
        type: 'success',
        textMsg: 'Usuário Aletrado com Sucesso!'
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
  const [updateUser, { loading }] = useMutation(UPDATE_USER, optionsUpdateUser);

  /********* DISABLE USERS  ***********/
  const optionsDisableUser = {
    onCompleted() {
      setConfigSnackbar({
        type: 'success',
        textMsgArray: ['Usuário Desativado com Sucesso!', 'Você será deslogado em 5 segundos']
      });
      setOpen(true);
      setTimeout(logout, 5000);
    },
    onError(error) {
      setConfigSnackbar({
        error,
        type: 'ERROR',
      });
      setOpen(true);
    },
  };
  const [disableUser, { loadingAsDisableUser }] = useMutation(DISABLE_USER, optionsDisableUser)

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
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
    }),
    onSubmit: async (values) => {
      try {
        const { name, email } = values;
        const variables = { id: userProfile.id, name, email }
        await updateUser({ variables });
        updateUserCurrent({ ...userCurrent, name, email })

      } catch (error) {
        AlertCatchSystem();
      }
    }
  });

  const handleDisableUser = async () => {
    try {
      await disableUser({ variables: { id: userProfile.id } });

    } catch (error) {
      AlertCatchSystem();
    }
  }

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesProfileContainer}>
        <View style={styles.stylesProfileTitleHeader}>
          <Text style={styles.stylesProfileTitle}>Meu Perfil</Text>
          <Text style={styles.stylesProfileSubtitle}>Altere os seus dados</Text>
        </View>
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        {loadingQueryGetUserByToken ? <LoadingSystemSimple text="Buscado os dados do usuário." /> :
          <>
            <Form formik={formik} />
            <ButtonForm formik={formik} loading={loading} handleDisableUser={handleDisableUser} />
          </>
        }
      </View>
    </Layout>
  );
}
