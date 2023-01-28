import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useFormik } from 'formik';

import TabBarMarketplace from '../components/TabBarMarketplace';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';

import LoadingFullPage from '../../../../../components/LoadingFullPage';

import { GET_MARKETPLACES_ID } from '../../../../../graphql/marketplace/query';
import { useQuery } from '@apollo/client';

import { renderScene, routes } from '../utils';
import { formatMaskCnpj, formatMaskCep } from '../../../../../utils/helpersText';

export default function ViewMarketplace({ route }) {

  const { id } = route.params;

  const layout = useWindowDimensions();
  const navigation = useNavigation();
  const [marketplace, setMarketplace] = useState(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      cnpj: '',
      network: '',
      brand: '',
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
      state: '',
      city: '',
    },
    onSubmit: async () => {
      navigation.goBack();
    }
  });


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* Get MARKETPLACES ID ***********/
  const opitonsGetMarketplaceId = {
    onCompleted(data) {
      setMarketplace(data.getMarketplaceId);
    },
    onError(error) {
      AlertCatchSystem();
    },
    variables: {
      id
    },
    fetchPolicy: 'network-only'
  }
  const { loading: loadingGetMarketplaceId } = useQuery(GET_MARKETPLACES_ID, opitonsGetMarketplaceId);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  /* LOAD DATA IN FORMIK */
  if (!loadingGetMarketplaceId && marketplace) {
    formik.initialValues.cnpj = formatMaskCnpj(marketplace.cnpj);
    formik.initialValues.brand = marketplace.brand.name;
    formik.initialValues.network = marketplace.brand.network.name;
    formik.initialValues.cep = formatMaskCep(marketplace.cep);
    formik.initialValues.street = marketplace.street;
    formik.initialValues.number = marketplace.number;
    formik.initialValues.neighborhood = marketplace.neighborhood;
    formik.initialValues.complement = marketplace.complement;
    formik.initialValues.state = marketplace.city.state.name;
    formik.initialValues.city = marketplace.city.name;
  }

  /* GROUPERS */
  const handlesModais = {
    handleOpenModalNetwork: () => { },
    handleOpenModalBrand: () => { },
    handleOpenModalState: () => { },
    handleOpenModalCity: () => { },
  }

  const loadings = {
    loadingGetAllNetwork: false,
    loadingGetBrandForNetwork: false,
    loadingGetStates: false,
    loadingGetCitys: false,
    loadingActionMarketplace: false,
  }

  const titlesScreens = {
    titleFormMarketplaceData: 'Visualizar Mercado',
    titleFormGroup: 'Visualizar Mercado',
    titleFormAddressInitial: 'Visualizar Endereço do Mercado',
    titleFormAddress: 'Visualizar Edereço do Mercado',
    titleFormActions: 'Voltar a Lista',
  }

  // Mocks and Configs
  const configSnackbar = {}
  const isView = true;

  return (
    <>
      {loadingGetMarketplaceId ? <LoadingFullPage /> :
        <>
          <TabView
            navigationState={{ index, routes }}
            renderScene={
              ({ route }) => renderScene(route, titlesScreens, formik, open, configSnackbar, setOpen, handlesModais, loadings, isView)
            }
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => <TabBarMarketplace {...props} />}
            tabBarPosition={"bottom"}
          />
        </>
      }
    </>
  );
}
