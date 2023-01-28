import { useEffect, useState, useRef } from 'react';
import { View, FlatList } from 'react-native';

import Layout from '../../../../../components/Layout';
import NetworkCardsList from './components/NetworkCardsList';
import AppbarFilter from './components/AppbarFilter';
import ListEmptyComponent from '../../../../../components/ListEmptyComponent';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';
import LoadingSystemSimple from '../../../../../components/LoadingSystemSimple';
import NetworkSearchForm from './components/NetworkSearchForm';
import SearchModal from '../../../../../components/SearchModal';

import { GET_NETWORK_NAME } from '../../../../../graphql/networks/query';
import { useLazyQuery } from '@apollo/client';

import styles from '../../../../../styles';

export default function NetworkList({ navigation }) {
  const [networks, setNetworks] = useState([]);
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
        <AppbarFilter filters={filters} openFilters={handleOpenFilters} />
        {loadingGetNetworkName ? <LoadingSystemSimple /> :
          <View style={styles.stylesListsSystemContainerViewList} >
            <FlatList
              data={networks}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <NetworkCardsList
                  network={item}
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
