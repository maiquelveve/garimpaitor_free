import { useState, useRef, useEffect } from 'react';
import { useWindowDimensions, Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TabBarMarketplace from '../components/TabBarMarketplace';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';

import LoadingFullPage from '../../../../../components/LoadingFullPage';
import { RenderItemDefault } from '../../../../../components/SelectBox/RenderItemDefault';
import { SelectBox } from '../../../../../components/SelectBox';

import { GET_ALL_NETWORKS } from '../../../../../graphql/networks/query';
import { GET_FOR_NETWORK } from '../../../../../graphql/brands/query';
import { GET_STATES, GET_CITYS } from '../../../../../graphql/address/query';
import { UPDATE_MARKETPLACE } from '../../../../../graphql/marketplace/mutation';
import { GET_MARKETPLACES_ID } from '../../../../../graphql/marketplace/query';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

import debouce from '../../../../../utils/debounce';
import { renderScene, routes } from '../utils';
import { formatMaskCnpj, formatMaskCep } from '../../../../../utils/helpersText';

const { height } = Dimensions.get('window');

export default function EditMarketplace({ route }) {

  const { id } = route.params;


  const layout = useWindowDimensions();
  const [marketplace, setMarketplace] = useState(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [configSnackbar, setConfigSnackbar] = useState({});

  /* SELECT NETWORKS - STATES */
  const modalizeNetworkRef = useRef(null);
  const [networkCurrent, setNetworkCurrent] = useState({})
  const [networks, setNetworks] = useState([]);

  /* SELECT BRANDS - STATES */
  const modalizeBrandRef = useRef(null);
  const [brandCurrent, setBrandCurrent] = useState({})
  const [brands, setBrands] = useState([]);

  /* SELECT STATES - STATES */
  const modalizeStateRef = useRef(null);
  const [stateCurrent, setStateCurrent] = useState({})
  const [states, setStates] = useState([]);

  /* SELECT CITYS - STATES */
  const modalizeCityRef = useRef(null);
  const [cityCurrent, setCityCurrent] = useState({})
  const [citys, setCitys] = useState([]);

  useEffect(() => {
    async function fetch() {
      if (networkCurrent.id)
        await getForNetwork({ variables: { network_id: networkCurrent.id } })
    }
    fetch()
  }, [networkCurrent]);

  useEffect(() => {
    async function fetch() {
      if (stateCurrent.id)
        await getCitys({ variables: { state_id: stateCurrent.id } })
    }
    fetch()
  }, [stateCurrent]);

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
    validationSchema: Yup.object({
      cnpj: Yup
        .string()
        .max(18, 'CNPJ não pode ser maior de 14 dígitos')
        .min(18, 'CNPJ deve ter no mímino 14 dígitos')
        .required('CNPJ é obrigatório'),
      network: Yup
        .string()
        .required('Rede é obrigatória'),
      brand: Yup
        .string()
        .required('Marca é obrigatória'),
      cep: Yup
        .string()
        .max(9, 'CEP não pode ser maior de 8 dígitos')
        .min(9, 'CEP deve ter no mímino 8 dígitos')
        .required('CEP é obrigatório'),
      street: Yup
        .string()
        .max(100, 'Rua não pode ser maior de 100 caracteres')
        .min(3, 'Rua deve ter no mímino 3 caracteres')
        .required('Rua é obrigatória'),
      number: Yup
        .string()
        .max(50, 'Número não pode ser maior de 50 caracteres')
        .min(2, 'Número deve ter no mímino 3 caracteres')
        .required('Número é obrigatório'),
      neighborhood: Yup
        .string()
        .max(100, 'Bairro não pode ser maior de 100 caracteres')
        .min(3, 'Bairro deve ter no mímino 3 caracteres')
        .required('Bairro é obrigatório'),
      complement: Yup
        .string()
        .max(100, 'Complemento não pode ser maior de 100 caracteres')
        .min(3, 'Complemento deve ter no mímino 3 caracteres'),
      state: Yup
        .string()
        .required('Estado é obrigatório'),
      city: Yup
        .string()
        .required('Cidade é obrigatória'),

    }),
    onSubmit: async (values) => {
      const variables = {
        id,
        cnpj: values.cnpj,
        street: values.street,
        number: values.number,
        neighborhood: values.neighborhood,
        cep: values.cep,
        complement: values.complement,
        city_id: cityCurrent.id,
        brand_id: brandCurrent.id,
      }
      try {
        await updateMarketplace({ variables });

      } catch (error) {
        AlertCatchSystem();
      }
    }
  });


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* Get MARKETPLACES ID ***********/
  const opitonsGetMarketplaceId = {
    onCompleted(data) {
      setMarketplace(data.getMarketplaceId);
      setNetworkCurrent(data.getMarketplaceId.brand.network);
      setBrandCurrent(data.getMarketplaceId.brand);
      setStateCurrent(data.getMarketplaceId.city.state);
      setCityCurrent(data.getMarketplaceId.city);
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

  /********* Get All NETWORKS ***********/
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

  /********* Get All BRANDS for NETWORKS ***********/
  const optionsGetBrandForNetworks = {
    onCompleted(data) {
      setBrands(data.getForNetwork);
    },
    onError() {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  }
  const [getForNetwork, { loading: loadingGetBrandForNetwork }] = useLazyQuery(GET_FOR_NETWORK, optionsGetBrandForNetworks);

  /********* Get All STATES ***********/
  const optionsGetStates = {
    onCompleted(data) {
      setStates(data.getStates);
    },
    onError(error) {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  }
  const { loading: loadingGetStates } = useQuery(GET_STATES, optionsGetStates);

  /********* Get All CITYs for States ***********/
  const optionsGetCitys = {
    onCompleted(data) {
      setCitys(data.getCitys);
    },
    onError(error) {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  }
  const [getCitys, { loading: loadingGetCitys }] = useLazyQuery(GET_CITYS, optionsGetCitys);

  /********* UPDATE MARKEPLACES ***********/
  const optionsUpdateMarketplace = {
    onCompleted() {
      setConfigSnackbar({
        type: 'success',
        textMsg: 'Mercado Alterado com Sucesso!'
      });
      setOpen(true);
    },
    onError(error) {
      console.log(error)
      setConfigSnackbar({
        error,
        type: 'ERROR',
      });
      setOpen(true);
    },
  }
  const [
    updateMarketplace,
    { loading: loadingUpdateMarketplace }
  ] = useMutation(UPDATE_MARKETPLACE, optionsUpdateMarketplace);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  /* SELECT NETWORK - ACTIONS */
  const handleOpenModalNetwork = () => {
    modalizeNetworkRef.current?.open();
  }

  const handleClosedModalNetwork = () => {
    debouce(() => modalizeNetworkRef.current?.close(), 900);
  }

  const handleSelectedNetwork = (network) => {
    formik.setFieldValue('network', network.name);
    formik.setFieldValue('brand', '');
    setNetworkCurrent(network);
    setBrandCurrent({});
  }

  /* SELECT BRAND - ACTIONS */
  const handleOpenModalBrand = () => {
    modalizeBrandRef.current?.open();
  }

  const handleClosedModalBrand = () => {
    debouce(() => modalizeBrandRef.current?.close(), 900);
  }

  const handleSelectedBrand = (brand) => {
    formik.setFieldValue('brand', brand.name);
    setBrandCurrent(brand);
  }

  /* SELECT STATE - ACTIONS */
  const handleOpenModalState = () => {
    modalizeStateRef.current?.open();
  }

  const handleClosedModalState = () => {
    debouce(() => modalizeStateRef.current?.close(), 900);
  }

  const handleSelectedState = (state) => {
    formik.setFieldValue('state', state.name);
    formik.setFieldValue('city', '');
    setStateCurrent(state);
    setCityCurrent({});
  }

  /* SELECT CITY - ACTIONS */
  const handleOpenModalCity = () => {
    modalizeCityRef.current?.open();
  }

  const handleClosedModalCity = () => {
    debouce(() => modalizeCityRef.current?.close(), 900);
  }

  const handleSelectedCity = (city) => {
    formik.setFieldValue('city', city.name);
    setCityCurrent(city);
  }

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
    handleOpenModalNetwork,
    handleOpenModalBrand,
    handleOpenModalState,
    handleOpenModalCity,
  }

  const loadings = {
    loadingGetAllNetwork,
    loadingGetBrandForNetwork,
    loadingGetStates,
    loadingGetCitys,
    loadingActionMarketplace: loadingUpdateMarketplace,
  }

  const titlesScreens = {
    titleFormMarketplaceData: 'Alerar Mercado',
    titleFormGroup: 'Alterar Mercado',
    titleFormAddressInitial: 'Alterar Endereço do Mercado',
    titleFormAddress: 'Alterar Edereço do Mercado',
    titleFormActions: 'Salvar Alerações',
  }

  return (
    <>
      {loadingGetMarketplaceId ? <LoadingFullPage /> :
        <>
          <TabView
            navigationState={{ index, routes }}
            renderScene={
              ({ route }) => renderScene(route, titlesScreens, formik, open, configSnackbar, setOpen, handlesModais, loadings)
            }
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => <TabBarMarketplace {...props} />}
            tabBarPosition={"bottom"}
          />
          <SelectBox
            modalizeRef={modalizeNetworkRef}
            listItem={networks}
            snapPoint={height / 1.7}
            RenderItemComponent={RenderItemDefault}
            handleChangeValue={handleSelectedNetwork}
            valueCurrent={networkCurrent}
            handleClosedModal={handleClosedModalNetwork}
          />
          <SelectBox
            modalizeRef={modalizeBrandRef}
            listItem={brands}
            snapPoint={height / 1.7}
            RenderItemComponent={RenderItemDefault}
            handleChangeValue={handleSelectedBrand}
            valueCurrent={brandCurrent}
            handleClosedModal={handleClosedModalBrand}
            msgListEmpty={networkCurrent.id ? 'Nenhum Item encontrado!' : 'Escolha uma Rede'}
          />
          <SelectBox
            modalizeRef={modalizeStateRef}
            listItem={states}
            snapPoint={height / 1.7}
            RenderItemComponent={RenderItemDefault}
            handleChangeValue={handleSelectedState}
            valueCurrent={stateCurrent}
            handleClosedModal={handleClosedModalState}
          />
          <SelectBox
            modalizeRef={modalizeCityRef}
            listItem={citys}
            snapPoint={height / 1.7}
            RenderItemComponent={RenderItemDefault}
            handleChangeValue={handleSelectedCity}
            valueCurrent={cityCurrent}
            handleClosedModal={handleClosedModalCity}
            msgListEmpty={stateCurrent.id ? 'Nenhum Item encontrado!' : 'Escolha um Estado'}
          />
        </>
      }
    </>
  );
}
