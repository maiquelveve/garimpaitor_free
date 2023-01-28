import { useEffect, useState, useRef } from 'react';
import { View, FlatList } from 'react-native';

import { GET_ALL_USERS } from '../../../../../graphql/users/query';
import { ACTIVATE_USER_ROOT, DISABLE_USER_ROOT } from '../../../../../graphql/users/mutation';
import { useLazyQuery, useMutation } from '@apollo/client';

import Layout from '../../../../../components/Layout';
import UserCards from './components/UserCardsList';
import AppbarFilter from './components/AppbarFilter';
import ListEmptyComponent from '../../../../../components/ListEmptyComponent';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';
import LoadingSystemSimple from '../../../../../components/LoadingSystemSimple';
import SnackbarAlert from '../../../../../components/SnackbarAlert';
import UserSearchForm from './components/UserSearchForm';
import SearchModal from '../../../../../components/SearchModal';

import styles from '../../../../../styles';

export default function UsersList({ navigation }) {
  const [users, setUsers] = useState([]);
  const [configSnackbar, setConfigSnackbar] = useState({});
  const [loadingActions, setLoadingActions] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState('');

  const filtersRef = useRef(filters); // Used as a filter when returning a STACK route.

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* LIST USERS ***********/
  const optionsGetAllUser = {
    onCompleted(data) {
      setUsers(data.getAllUsers);
    },
    onError() {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  }
  const [getAllUsers, { loading }] = useLazyQuery(GET_ALL_USERS, optionsGetAllUser);

  /********* ACTIVATE USERS ***********/
  const optionsActivateUser = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Usuário Aletrado com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingActivateUserRoot);
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
      const usersInCache = cache.readQuery({ query: GET_ALL_USERS, variables: { name: filtersRef.current } });

      cache.writeQuery({
        query: GET_ALL_USERS,
        data: {
          getAllUsers: usersInCache,
        },
        variables: {
          name: filtersRef.current
        }
      });
      setUsers(usersInCache.getAllUsers);
    }
  }
  const [activateUserRoot, { loading: loadingActivateUserRoot }] = useMutation(ACTIVATE_USER_ROOT, optionsActivateUser);

  /********* DEACTIVATE USERS ***********/
  const optionsDeactivateUser = {
    onCompleted() {
      setConfigSnackbar({
        zIndex: 1,
        type: 'success',
        textMsg: 'Usuário Aletrado com Sucesso!'
      });
      setOpen(true);
      setLoadingActions(loadingDeactivateUserRoot);
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
      const usersInCache = cache.readQuery({ query: GET_ALL_USERS, variables: { name: filtersRef.current } });

      cache.writeQuery({
        query: GET_ALL_USERS,
        data: {
          getAllUsers: usersInCache,
        },
        variables: {
          name: filtersRef.current
        }
      });
      setUsers(usersInCache.getAllUsers);
    }
  }
  const [deactivateUserRoot, { loading: loadingDeactivateUserRoot }] = useMutation(DISABLE_USER_ROOT, optionsDeactivateUser);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  // Run firts time when entering the screen or edit filters
  useEffect(() => {
    async function fetch() {
      try {
        await getAllUsers({ variables: { name: filtersRef.current } });
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
        await getAllUsers({ variables: { name: filtersRef.current } });
      } catch (error) {
        AlertCatchSystem();
      }
    });
  }, [navigation]);

  const handleActivateUserRoot = async (user_id) => {
    setLoadingActions(true);
    await activateUserRoot({ variables: { user_id } });
  }

  const handleDeactivateUserRoot = async (user_id) => {
    setLoadingActions(true);
    await deactivateUserRoot({ variables: { user_id } });
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
        {loading ? <LoadingSystemSimple /> :
          <View style={styles.stylesListsSystemContainerViewList} >
            <FlatList
              data={users}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <UserCards
                  user={item}
                  loadingActions={loadingActions}
                  activateUser={handleActivateUserRoot}
                  deactivateUser={handleDeactivateUserRoot}
                />
              )}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <ListEmptyComponent
                  msg={'Nenhum usuário localizado'}
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
        title={"Pesquisar Usuários"}
        FormChildren={<UserSearchForm handleSubmit={handleSubmit} filtersCurrent={filters} />}
      />
    </Layout>
  );
}
