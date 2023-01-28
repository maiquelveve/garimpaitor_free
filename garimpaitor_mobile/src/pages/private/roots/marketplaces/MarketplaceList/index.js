import { useEffect, useState, useRef } from 'react';
import { View, FlatList } from 'react-native';

import Layout from '../../../../../components/Layout';
import MarketplaceCardsList from './components/MarketplaceCardsList';
import AppbarFilter from './components/AppbarFilter';
import ListEmptyComponent from '../../../../../components/ListEmptyComponent';
import LoadingSystemSimple from '../../../../../components/LoadingSystemSimple';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';
import SnackbarAlert from '../../../../../components/SnackbarAlert';
import SearchModal from '../../../../../components/SearchModal';
import MarketplaceSearchForm from './components/MarketplaceSearchForm';

import { GET_MARKETPLACES_FILTERS } from '../../../../../graphql/marketplace/query';
import { DISABLE_MARKETPLACE_SYSTEM, ACTIVATE_MARKETPLACE_SYSTEM } from '../../../../../graphql/marketplace/mutation';
import {
  ADD_MARKETPLACE_USER,
  DISABLE_MARKETPLACE_USER,
  ACTIVATE_MARKETPLACE_USER
} from '../../../../../graphql/marketplaceUser/mutation';
import { useLazyQuery, useMutation } from '@apollo/client';

import { useAuth } from '../../../../../contexts/authContext';

import styles from '../../../../../styles';

export default function MarketplaceList({ navigation }) {
  const [marketplaces, setMarketplaces] = useState([]);
  const [configSnackbar, setConfigSnackbar] = useState({});
  const [loadingActions, setLoadingActions] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [filtersBrand, setFiltersBrand] = useState('');
  const [filtersNetwork, setFiltersNetwork] = useState('');
  const [filtersCity, setFiltersCity] = useState('');
  const [filtersCnpj, setFiltersCnpj] = useState('');

  const filtersBrandRef = useRef(filtersBrand); // Used as a filter when returning a STACK route.
  const filtersNetworkRef = useRef(filtersNetwork); // Used as a filter when returning a STACK route.
  const filtersCityRef = useRef(filtersCity); // Used as a filter when returning a STACK route.
  const filtersCnpjRef = useRef(filtersCnpj); // Used as a filter when returning a STACK route.

  const { userCurrent } = useAuth();

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* LIST MARKEPLACES ***********/
  const optionsGetMarketplaceFilters = {
    onCompleted(data) {
      setMarketplaces(data.getMarketplaceFilters);
    },
    onError() {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  }
  const [
    getMarketplaceFilters,
    { loading: loadingGetMarketplaceFilters }
  ] = useLazyQuery(GET_MARKETPLACES_FILTERS, optionsGetMarketplaceFilters);

  /********* DISABLE MARKTPLACE SYSTEM ***********/
  const optionsDisableMarketplaceSystem = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Mercado Desativado com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingDisableMarketplaceSystem);
    },
    onError(error) {
      setConfigSnackbar({
        zIndex: 1,
        error,
        type: 'ERROR',
      });
      setOpen(true);
    },
    update(cache) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: getMarketplaceFiltersIncache
        },
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      setMarketplaces(getMarketplaceFiltersIncache.getMarketplaceFilters);
    }
  }
  const [
    disableMarketplaceSystem,
    { loading: loadingDisableMarketplaceSystem }
  ] = useMutation(DISABLE_MARKETPLACE_SYSTEM, optionsDisableMarketplaceSystem);

  /********* ACTIVATE MARKTPLACE SYSTEM ***********/
  const optionsActivateMarketplaceSystem = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Mercado Ativado com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingActivateMarketplaceSystem);
    },
    onError(error) {
      setConfigSnackbar({
        zIndex: 1,
        error,
        type: 'ERROR',
      });
      setOpen(true);
    },
    update(cache) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: getMarketplaceFiltersIncache
        },
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      setMarketplaces(getMarketplaceFiltersIncache.getMarketplaceFilters);
    }
  }
  const [
    activateMarketplaceSystem,
    { loading: loadingActivateMarketplaceSystem }
  ] = useMutation(ACTIVATE_MARKETPLACE_SYSTEM, optionsActivateMarketplaceSystem);


  /********* ADD MARKTPLACE USER ***********/
  const optionsAddMarketplaceUser = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Mercado Adicionado com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingAddMarketplaceUser);
    },
    onError(error) {
      setConfigSnackbar({
        zIndex: 1,
        error,
        type: 'ERROR',
      });
      setOpen(true);
    },
    update(cache) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: getMarketplaceFiltersIncache
        },
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      setMarketplaces(getMarketplaceFiltersIncache.getMarketplaceFilters);
    }
  }
  const [
    addMartplaceUser,
    { loading: loadingAddMarketplaceUser }
  ] = useMutation(ADD_MARKETPLACE_USER, optionsAddMarketplaceUser);

  /********* DISABLE MARKTPLACE USER ***********/
  const optionsDisableMarketplaceUser = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Mercado Desabilitado com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingDisableMarketplaceUser);
    },
    onError(error) {
      setConfigSnackbar({
        zIndex: 1,
        error,
        type: 'ERROR',
      });
      setOpen(true);
    },
    update(cache) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: getMarketplaceFiltersIncache
        },
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      setMarketplaces(getMarketplaceFiltersIncache.getMarketplaceFilters);
    }
  }
  const [
    disableMarketplaceUser,
    { loading: loadingDisableMarketplaceUser }
  ] = useMutation(DISABLE_MARKETPLACE_USER, optionsDisableMarketplaceUser);

  /********* ACTIVATE MARKTPLACE USER ***********/
  const optionsActivateMarketplaceUser = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Mercado re-ativado com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingActivateMarketplaceUser);
    },
    onError(error) {
      setConfigSnackbar({
        zIndex: 1,
        error,
        type: 'ERROR',
      });
      setOpen(true);
    },
    update(cache) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: getMarketplaceFiltersIncache
        },
        variables: {
          brand: filtersBrandRef.current,
          network: filtersNetworkRef.current,
          city: filtersCityRef.current,
          cnpj: filtersCnpjRef.current,
        }
      });

      setMarketplaces(getMarketplaceFiltersIncache.getMarketplaceFilters);
    }
  }
  const [
    activateMarketplaceUser,
    { loading: loadingActivateMarketplaceUser }
  ] = useMutation(ACTIVATE_MARKETPLACE_USER, optionsActivateMarketplaceUser);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  // Run firts time when entering the screen or edit filters
  useEffect(() => {
    async function fetch() {
      try {
        await getMarketplaceFilters({
          variables: {
            brand: filtersBrandRef.current,
            network: filtersNetworkRef.current,
            city: filtersCityRef.current,
            cnpj: filtersCnpjRef.current,
          }
        });
      } catch (error) {
        AlertCatchSystem();
      }
    }
    fetch()
  }, [filtersBrand, filtersNetwork, filtersCity, filtersCnpj]);

  // Run when entering the screen
  useEffect(() => {
    navigation.addListener('focus', async () => {
      try {
        await getMarketplaceFilters({
          variables: {
            brand: filtersBrandRef.current,
            network: filtersNetworkRef.current,
            city: filtersCityRef.current,
            cnpj: filtersCnpjRef.current,
          }
        });
      } catch (error) {
        AlertCatchSystem();
      }
    });
  }, [navigation]);

  const handleOpenFilters = async () => {
    setOpenFilters(true);
  }

  const handleClosedOpenFilters = async () => {
    setOpenFilters(false);
  }

  const handleActivateMarketplaceSystem = async (id) => {
    try {
      setLoadingActions(true);
      await activateMarketplaceSystem({ variables: { id } });
    } catch (error) {
      AlertCatchSystem();
    }
  }

  const handleDeactivateMarketplaceSystem = async (id) => {
    try {
      setLoadingActions(true);
      await disableMarketplaceSystem({ variables: { id } });
    } catch (error) {
      AlertCatchSystem();
    }
  }

  const handleAddMarketplaceUser = async (id) => {
    try {
      setLoadingActions(true);
      await addMartplaceUser({ variables: { marketplace_id: id, user_id: userCurrent?.id } });
    } catch (error) {
      AlertCatchSystem();
    }
  }

  const handleDisableMarketplaceUser = async (id) => {
    try {
      setLoadingActions(true);
      await disableMarketplaceUser({ variables: { id } });
    } catch (error) {
      AlertCatchSystem();
    }
  }

  const handleActivateMarketplaceUser = async (id) => {
    try {
      setLoadingActions(true);
      await activateMarketplaceUser({ variables: { id } });
    } catch (error) {
      AlertCatchSystem();
    }
  }

  const handleSubmitFilters = ({ brand, network, city, cnpj }) => {
    filtersBrandRef.current = brand.trim();
    filtersNetworkRef.current = network.trim();
    filtersCityRef.current = city.trim();
    filtersCnpjRef.current = cnpj.trim();

    setFiltersBrand(brand.trim());
    setFiltersNetwork(network.trim());
    setFiltersCity(city.trim());
    setFiltersCnpj(cnpj.trim());

    handleClosedOpenFilters();
  }

  return (
    <Layout setScrollView={false} >
      <View style={styles.stylesListsSystemContainer} >
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <AppbarFilter filters={{ filtersBrand, filtersNetwork, filtersCity, filtersCnpj }} openFilters={handleOpenFilters} />
        {loadingGetMarketplaceFilters ? <LoadingSystemSimple /> :
          <View style={styles.stylesListsSystemContainerViewList} >
            <FlatList
              data={marketplaces}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <MarketplaceCardsList
                  marketplace={item}
                  loadingActions={loadingActions}
                  activateMarketplace={handleActivateMarketplaceSystem}
                  deactivateMarketplace={handleDeactivateMarketplaceSystem}
                  addMarketplaceUser={handleAddMarketplaceUser}
                  disableMarketplaceUser={handleDisableMarketplaceUser}
                  activateMarketplaceUser={handleActivateMarketplaceUser}
                />
              )}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <ListEmptyComponent
                  msg={'Nenhum Mercado localizado'}
                  subMsg={"Melhore sua pesquisa utilizando os filtros!"}
                  isSubMsg={true}
                />
              }
            />
          </View>
        }
      </View>
      <SearchModal
        open={openFilters}
        handleClosedOpen={handleClosedOpenFilters}
        title={"Pesquisar Mercados"}
        FormChildren={
          <MarketplaceSearchForm
            handleSubmit={handleSubmitFilters}
            filtersCurrent={{ filtersBrand, filtersNetwork, filtersCity, filtersCnpj }}
          />
        }
        style={{
          modalStyleContent: { height: 'auto' }
        }}
      />
    </Layout>
  );
}