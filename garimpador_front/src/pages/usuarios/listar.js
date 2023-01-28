import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { UserList } from 'src/components/UsersComponents/user-list';
import { UserListToobar } from 'src/components/UsersComponents/user-list-toobar';

import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';
import ChangePermissionUserModal from './usersModals/ChangePermissionUserModal';
import loggedInOnlyRoot from 'src/services/getServerSidePropsSystem/loggedInOnlyRoot';

import { AlertCatch, AlertsActivateOrDeactivate, AlertMessage } from 'src/components/AlertsComponents';
import { DISABLE_USER_ROOT, ACTIVATE_USER_ROOT, CHANGE_PERMISSION_ROOT } from 'src/graphql/users/mutation';
import { MESSAGE_ERROR_ALERT_CATCH } from 'src/config/constant';

import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_ALL_USERS } from 'src/graphql/users/query';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [userNameFilter, setUserNameFilter] = useState('');
  const [userChangePermission, setUserChangePermission] = useState({});
  const [loadingUserPage, setLoadingUserPage] = useState(true);
  const [open, setOpen] = useState(false);
  const [openChangePermissionModal, setOpenChangePermissionModal] = useState(false);
  const [configAlert, setConfigAlert] = useState({});

  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* LIST USERS ***********/
  const optionsGetAllUser = {
    onCompleted(data) {
      setUsers(data.getAllUsers);
      setLoadingUserPage(loading)
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    }
  }
  const [getAllUsers, { loading }] = useLazyQuery(GET_ALL_USERS, optionsGetAllUser);

  /********* CHANGE PERMISSION USERS ***********/
  const optionsChangePermission = {
    onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Permissão do Usuário alterada com Sucesso!'
      });
      setOpen(true);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
    update(cache) {
      const usersInCache = cache.readQuery({ query: GET_ALL_USERS, variables: { name: userNameFilter } });

      cache.writeQuery({
        query: GET_ALL_USERS,
        data: {
          getAllUsers: usersInCache,
        },
        variables: {
          name: userNameFilter
        }
      });
      setUsers(usersInCache.getAllUsers);
    }
  }
  const [changePermissionRoot] = useMutation(CHANGE_PERMISSION_ROOT, optionsChangePermission);

  /********* DEACTIVATE USER *************/
  const optionsDeactiveUser = {
    onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Usuário Desativado com Sucesso!'
      });
      setOpen(true);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
    update(cache) {
      const usersInCache = cache.readQuery({ query: GET_ALL_USERS, variables: { name: userNameFilter } });

      cache.writeQuery({
        query: GET_ALL_USERS,
        data: {
          getAllUsers: usersInCache,
        },
        variables: {
          name: userNameFilter
        }
      });
      setUsers(usersInCache.getAllUsers);
    }
  }
  const [disableUserRoot] = useMutation(DISABLE_USER_ROOT, optionsDeactiveUser);

  /********** ACTIVATE USER *************/
  const optionsActivateUser = {
    onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Usuário ativado com Sucesso!'
      });
      setOpen(true);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
    update(cache) {
      const usersInCache = cache.readQuery({ query: GET_ALL_USERS, variables: { name: userNameFilter } });

      cache.writeQuery({
        query: GET_ALL_USERS,
        data: {
          getAllUsers: usersInCache,
        },
        variables: {
          name: userNameFilter
        }
      });
      setUsers(usersInCache.getAllUsers);
    }
  }
  const [activateUserRoot] = useMutation(ACTIVATE_USER_ROOT, optionsActivateUser);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  useEffect(async () => {
    setLoadingUserPage(true);
    await getAllUsers({ variables: { name: userNameFilter } })
  }, [userNameFilter]);


  const handleDeactiveUser = user => {
    const data = {
      tilte: "Desativar Usuário?",
      text: "Deseja realmente DESATIVAR o usuário?",
      object: user.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Usuário Desativado!",
      textResult: `O usuario foi desativado com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => disableUserRoot({ variables: { user_id: user.id } }));
  }

  const handleActiveUser = user => {
    const data = {
      tilte: "Ativar Usuário?",
      text: "Deseja realmente ATIVAR o usuário?",
      object: user.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Usuário Ativado!",
      textResult: `O usuario foi ativado com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => activateUserRoot({ variables: { user_id: user.id } }));
  }

  const handleOpenModalChangePermmisionUser = user => {
    setUserChangePermission(user);
    setOpenChangePermissionModal(true);
  }

  const handleSaveChangePermissionUser = async (user, permission) => {
    await changePermissionRoot({ variables: { user_id: user.id, permission } })
    setOpenChangePermissionModal(false);
  }

  return (
    <>
      <Head>
        <title>
          Listar Usuários | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
              }}
            >
              <Typography
                sx={{ m: 1 }}
                variant="h4"
              >
                Listar Usuários
              </Typography>
              {open &&
                <AlertMessage configAlert={configAlert} open={open} setOpen={setOpen} />
              }
            </Box>
            <UserListToobar setUserNameFilter={setUserNameFilter} />
          </Box>
          <Box sx={{ mt: 3 }}>
            {loadingUserPage ?
              <LoadingSimple />
              :
              <UserList
                users={users}
                handleDeactiveUser={handleDeactiveUser}
                handleActiveUser={handleActiveUser}
                handleOpenModalChangePermmisionUser={handleOpenModalChangePermmisionUser}
              />
            }
          </Box>
        </Container>
      </Box>
      {openChangePermissionModal &&
        <ChangePermissionUserModal
          user={userChangePermission}
          open={openChangePermissionModal}
          setOpen={setOpenChangePermissionModal}
          handleSaveChangePermissionUser={handleSaveChangePermissionUser}
          fullWidth={true}
          maxWidth="sm"
        />
      }
    </>
  )
};

ListUsers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ListUsers;

export const getServerSideProps = async (ctx) => {
  return loggedInOnlyRoot(ctx);
}
