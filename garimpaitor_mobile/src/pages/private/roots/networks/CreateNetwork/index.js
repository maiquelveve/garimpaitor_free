import { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useMutation } from '@apollo/client';
import { CREATE_NETWORK_SYSTEM } from '../../../../../graphql/networks/mutation';

import Layout from '../../../../../components/Layout';
import SnackbarAlert from '../../../../../components/SnackbarAlert';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';

import styles from '../../../../../styles';

import Form from './Form';
import ButtonForm from './ButtonForm';

export default function CreateNetwork() {
  const [open, setOpen] = useState(false);
  const [configSnackbar, setConfigSnackbar] = useState({});

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* CREATE NETWORKS SYSTEM ***********/
  const optionsCreateNetworkSystem = {
    onCompleted() {
      setConfigSnackbar({
        type: 'success',
        textMsg: 'Rede Cadastrada com Sucesso!'
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
  const [createNetworkSystem, { loading }] = useMutation(CREATE_NETWORK_SYSTEM, optionsCreateNetworkSystem);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(150, 'Nome não pode ser maior de 150 caracteres')
        .min(3, 'Nome deve ter no mímino 3 caracteres')
        .required('Nome é obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        const { name } = values;
        const variables = { name }
        await createNetworkSystem({ variables });

      } catch (error) {
        AlertCatchSystem();
      }
    }
  });

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesViewsPagesContainer}>
        <View style={styles.stylesViewsPagesTitleHeader}>
          <Text style={styles.stylesViewsPagesTitle}>Nova Rede</Text>
          <Text style={styles.stylesViewsPagesSubtitle}>Informe os dados</Text>
        </View>
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <>
          <Form formik={formik} />
          <ButtonForm formik={formik} loading={loading} />
        </>
      </View>
    </Layout>
  );
}
