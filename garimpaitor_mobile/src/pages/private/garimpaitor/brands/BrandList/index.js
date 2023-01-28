import { useEffect, useState, useRef } from 'react';
import { View, FlatList } from 'react-native';

import Layout from '../../../../../components/Layout';
import BrandCardsList from './components/BrandCardsList';
import AppbarFilter from './components/AppbarFilter';
import ListEmptyComponent from '../../../../../components/ListEmptyComponent';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';
import LoadingSystemSimple from '../../../../../components/LoadingSystemSimple';
import SnackbarAlert from '../../../../../components/SnackbarAlert';
import BrandSearchForm from './components/BrandSearchForm';
import SearchModal from '../../../../../components/SearchModal';

import { GET_BRAND_NAME } from '../../../../../graphql/brands/query';
import { useLazyQuery } from '@apollo/client';

import styles from '../../../../../styles';

export default function BrandList({ navigation }) {
  const [brands, setBrands] = useState([]);
  const [configSnackbar, setConfigSnackbar] = useState({});
  const [loadingActions, setLoadingActions] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState('');

  const filtersRef = useRef(filters); // Used as a filter when returning a STACK route.

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* LIST BRANDS ***********/
  const optionsGetBrandsName = {
    onCompleted(data) {
      setBrands(data.getBrandName);
    },
    onError(error) {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  }
  const [getBrandName, { loading: loadingGetBrandName }] = useLazyQuery(GET_BRAND_NAME, optionsGetBrandsName);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  // Run firts time when entering the screen or edit filters
  useEffect(() => {
    async function fetch() {
      try {
        await getBrandName({ variables: { name: filtersRef.current } });
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
        await getBrandName({ variables: { name: filtersRef.current } });
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
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <AppbarFilter filters={filters} openFilters={handleOpenFilters} />
        {loadingGetBrandName ? <LoadingSystemSimple /> :
          <View style={styles.stylesListsSystemContainerViewList} >
            <FlatList
              data={brands}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <BrandCardsList
                  brand={item}
                />
              )}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <ListEmptyComponent
                  msg={'Nenhuma Marca localizada'}
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
        title={"Pesquisar Marcas"}
        FormChildren={<BrandSearchForm handleSubmit={handleSubmit} filtersCurrent={filters} />}
      />
    </Layout>
  );
}
