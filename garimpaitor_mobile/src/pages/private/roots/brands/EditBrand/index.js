import { useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_NETWORKS } from '../../../../../graphql/networks/query';
import { UPDATE_BRAND } from '../../../../../graphql/brands/mutation';

import Layout from '../../../../../components/Layout';
import SnackbarAlert from '../../../../../components/SnackbarAlert';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';
import LoadingSystemSimple from '../../../../../components/LoadingSystemSimple';
import { RenderItemDefault } from '../../../../../components/SelectBox/RenderItemDefault';
import { SelectBox } from '../../../../../components/SelectBox';

import debouce from '../../../../../utils/debounce';
import styles from '../../../../../styles';

import Form from './Form';
import ButtonForm from './ButtonForm';

const { height } = Dimensions.get('window');

export default function EditBrand({ route }) {
  const { brand } = route.params;

  const modalizeRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [networks, setNetworks] = useState([]);
  const [networkCurrent, setNetworkCurrent] = useState(brand.network);
  const [configSnackbar, setConfigSnackbar] = useState({});

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* LIST NETWORKS ***********/
  const optionsGetAllNetworks = {
    onCompleted(data) {
      setNetworks(data.getAllNetworks);
    },
    onError(error) {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  }
  const { loading: loadingGetAllNetwork } = useQuery(GET_ALL_NETWORKS, optionsGetAllNetworks);

  /********* UPDATE BRAND SYSTEM ***********/
  const optionsUpdateBrandSystem = {
    onCompleted() {
      setConfigSnackbar({
        type: 'success',
        textMsg: 'Marca Alterada com Sucesso!'
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
  const [updateBrand, { loading }] = useMutation(UPDATE_BRAND, optionsUpdateBrandSystem);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/

  const formik = useFormik({
    initialValues: {
      name: brand.name,
      network: brand.network.name
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(150, 'Nome não pode ser maior de 150 caracteres')
        .min(3, 'Nome deve ter no mímino 3 caracteres')
        .required('Nome é obrigatório'),
      network: Yup
        .string()
        .required('Rede é obrigatória'),
    }),
    onSubmit: async (values) => {
      try {
        const { name } = values;
        const variables = { id: brand.id, name, network_id: networkCurrent.id }
        await updateBrand({ variables });

      } catch (error) {
        AlertCatchSystem();
      }
    }
  });

  const handleOpenModalNetwork = () => {
    modalizeRef.current?.open();
  }

  const handleClosedModalNetwork = () => {
    debouce(() => modalizeRef.current?.close(), 900);
  }

  const handleSelectedNetwork = (network) => {
    formik.setFieldValue('network', network.name);
    setNetworkCurrent(network);
  }

  return (
    <>
      <Layout showHeader={false}>
        <View style={styles.stylesViewsPagesContainer}>
          <View style={styles.stylesViewsPagesTitleHeader}>
            <Text style={styles.stylesViewsPagesTitle}>Nova Marca</Text>
            <Text style={styles.stylesViewsPagesSubtitle}>Informe os dados</Text>
          </View>
          {open &&
            <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
          }
          {loadingGetAllNetwork ? <LoadingSystemSimple /> :
            <>
              <Form formik={formik} handleOpenModalNetwork={handleOpenModalNetwork} />
              <ButtonForm formik={formik} loading={loading} />
            </>
          }
        </View>
      </Layout>
      <SelectBox
        modalizeRef={modalizeRef}
        listItem={networks}
        snapPoint={height / 1.7}
        RenderItemComponent={RenderItemDefault}
        handleChangeValue={handleSelectedNetwork}
        valueCurrent={networkCurrent}
        handleClosedModal={handleClosedModalNetwork}
      />
    </>
  );
}
