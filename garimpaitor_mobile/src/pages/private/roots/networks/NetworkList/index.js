import { useEffect, useState, useRef } from 'react';
import { View, FlatList } from 'react-native';

import Layout from '../../../../../components/Layout';
import NetworkCardsList from './components/NetworkCardsList';
import AppbarFilter from './components/AppbarFilter';
import ListEmptyComponent from '../../../../../components/ListEmptyComponent';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';
import LoadingSystemSimple from '../../../../../components/LoadingSystemSimple';
import SnackbarAlert from '../../../../../components/SnackbarAlert';
import NetworkSearchForm from './components/NetworkSearchForm';
import SearchModal from '../../../../../components/SearchModal';

import { GET_NETWORK_NAME } from '../../../../../graphql/networks/query';
import { VERIFY_NETWORK, ACTIVATE_NETWORK, DISABLE_NETWORK } from '../../../../../graphql/networks/mutation';
import { useLazyQuery, useMutation } from '@apollo/client';

import styles from '../../../../../styles';

export default function NetworkList({ navigation }) {
  const [networks, setNetworks] = useState([]);
  const [configSnackbar, setConfigSnackbar] = useState({});
  const [loadingActions, setLoadingActions] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState('');

  const filtersRef = useRef(filters); // Used as a filter when returning a STACK route.

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* LIST NETWORKS ***********/
  const optionsGetNetworksName = {
    onCompleted(data) {
      setNetworks(data.getNetworkName);
    },
    onError(error) {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  }
  const [getNetworkName, { loading: loadingGetNetworkName }] = useLazyQuery(GET_NETWORK_NAME, optionsGetNetworksName);

  /********* ACTIVATE NETWORK ***********/
  const optionsActivateNetwork = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Rede Ativada com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingActivate);
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
      const getNetworkNameIncache = cache.readQuery({
        query: GET_NETWORK_NAME,
        variables: { name: filtersRef.current }
      });

      cache.writeQuery({
        query: GET_NETWORK_NAME,
        data: {
          getNetworkName: getNetworkNameIncache
        },
        variables: { name: filtersRef.current }
      });

      setNetworks(getNetworkNameIncache.getNetworkName);
    }
  }
  const [activateNetwork, { loading: loadingActivate }] = useMutation(ACTIVATE_NETWORK, optionsActivateNetwork);

  /********* DISABLE NETWORK ***********/
  const optionsDisableNetwork = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Rede Desativada com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingDisable);
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
      const getNetworkNameIncache = cache.readQuery({
        query: GET_NETWORK_NAME,
        variables: { name: filtersRef.current }
      });

      cache.writeQuery({
        query: GET_NETWORK_NAME,
        data: {
          getNetworkName: getNetworkNameIncache
        },
        variables: { name: filtersRef.current }
      });

      setNetworks(getNetworkNameIncache.getNetworkName);
    }
  }
  const [disableNetwork, { loading: loadingDisable }] = useMutation(DISABLE_NETWORK, optionsDisableNetwork);

  /********* VERIFY NETWORK ***********/
  const optionsVerifyNetwork = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Rede Aletrado com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingVerify);
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
      const getNetworkNameIncache = cache.readQuery({
        query: GET_NETWORK_NAME,
        variables: { name: filtersRef.current }
      });

      cache.writeQuery({
        query: GET_NETWORK_NAME,
        data: {
          getNetworkName: getNetworkNameIncache
        },
        variables: { name: filtersRef.current }
      });

      setNetworks(getNetworkNameIncache.getNetworkName);
    }
  }
  const [verifyNetwork, { loading: loadingVerify }] = useMutation(VERIFY_NETWORK, optionsVerifyNetwork);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  // Run firts time when entering the screen or edit filters
  useEffect(() => {
    async function fetch() {
      try {
        await getNetworkName({ variables: { name: filtersRef.current } });
      } catch (error) {
        AlertCatchSystem();
      }
    }
    fetch()
  }, [filters]);

  // Run when entering the screen
  useEffect(() => {
    navigation.addListener('focus', async () => {
      try {
        await getNetworkName({ variables: { name: filtersRef.current } });
      } catch (error) {
        AlertCatchSystem();
      }
    });
  }, [navigation]);

  const handleActivateNetworkRoot = async (id) => {
    setLoadingActions(true);
    await activateNetwork({ variables: { id } });
  }

  const handleDeactivateNetworkRoot = async (id) => {
    setLoadingActions(true);
    await disableNetwork({ variables: { id } })
  }

  const handleVerifyNetworkRoot = async (id) => {
    setLoadingActions(true);
    await verifyNetwork({ variables: { id } });
  }

  const handleOpenFilters = async () => {
    setOpenFilters(true);
  }

  const handleClosedOpenFilters = async () => {
    setOpenFilters(false);
  }

  const handleSubmit = (value) => {
    filtersRef.current = value.trim();
    setFilters(value.trim());
    handleClosedOpenFilters();
  }

  return (
    <Layout setScrollView={false} >
      <View style={styles.stylesListsSystemContainer} >
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <AppbarFilter filters={filters} openFilters={handleOpenFilters} />
        {loadingGetNetworkName ? <LoadingSystemSimple /> :
          <View style={styles.stylesListsSystemContainerViewList} >
            <FlatList
              data={networks}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <NetworkCardsList
                  network={item}
                  loadingActions={loadingActions}
                  activateNetwork={handleActivateNetworkRoot}
                  deactivateNetwork={handleDeactivateNetworkRoot}
                  verifyNetwork={handleVerifyNetworkRoot}
                />
              )}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <ListEmptyComponent
                  msg={'Nenhuma Rede localizada'}
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
        title={"Pesquisar Redes"}
        FormChildren={<NetworkSearchForm handleSubmit={handleSubmit} filtersCurrent={filters} />}
      />
    </Layout>
  );
}
