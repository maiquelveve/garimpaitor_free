import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Button } from '@mui/material';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { NetworkList } from 'src/components/NetworksComponents/network-list';
import { NetworkListToobar } from 'src/components/NetworksComponents/network-list-toobar';

import loggedInExceptMarket from 'src/services/getServerSidePropsSystem/loggedInExceptMarket';

import { MESSAGE_ERROR_ALERT_CATCH } from 'src/config/constant';
import { AlertCatch, AlertMessage, AlertsActivateOrDeactivate } from 'src/components/AlertsComponents';
import { useAuth } from 'src/context/authContext';
import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';
import CreateNetworkModal from './networksModals/CreateNetworkModal';
import UpdateNetworkModal from './networksModals/UpdateNetworkModal';

import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_NETWORK_NAME } from 'src/graphql/networks/query';
import { ACTIVATE_NETWORK, CREATE_NETWORK, CREATE_NETWORK_SYSTEM, DISABLE_NETWORK, VERIFY_NETWORK, UPDATE_NETWORK } from 'src/graphql/networks/mutation';

const ListNetworks = () => {
  const [networks, setNetworks] = useState([]);
  const [networkUpdate, setNetworkUpdate] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [configAlert, setConfigAlert] = useState({});
  const [loadingUserPage, setLoadingUserPage] = useState(true);
  const [networkNameFilter, setNetworkNameFilter] = useState('');
  const [openCreateNetworkModal, setOpenCreateNetworkModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { userCurrent } = useAuth();


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* LIST NETWORKS ***********/
  const optionsGetNetworksName = {
    onCompleted(data) {
      setNetworks(data.getNetworkName);
      setLoadingUserPage(loading);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    }
  }
  const [getNetworkName, { loading }] = useLazyQuery(GET_NETWORK_NAME, optionsGetNetworksName);

  /********* CREATE NETWORK ***********/
  const optionsCreateNetwork = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsgArray: ['Rede cadastrada com Sucesso!', 'Aguarde o adiministrador validar a rede'],
      });
      setOpenAlert(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlert(true);
    },
    update(cache, { data }) {
      const getNetworkNameIncache = cache.readQuery({
        query: GET_NETWORK_NAME,
        variables: { name: "" }
      });

      cache.writeQuery({
        query: GET_NETWORK_NAME,
        data: {
          getNetworkName: [data.createNetwork, ...getNetworkNameIncache.getNetworkName]
        },
        variables: { name: "" }
      });
    }
  }
  const [createNetwork] = useMutation(CREATE_NETWORK, optionsCreateNetwork);

  /********* CREATE NETWORK SYSTEM ***********/
  const optionsCreateNetworkSystem = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Rede cadastrada com Sucesso!',
      });
      setOpenAlert(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlert(true);
    },
    update(cache, { data }) {
      const getNetworkNameIncache = cache.readQuery({
        query: GET_NETWORK_NAME,
        variables: { name: "" }
      });

      cache.writeQuery({
        query: GET_NETWORK_NAME,
        data: {
          getNetworkName: [data.createNetworkSystem, ...getNetworkNameIncache.getNetworkName]
        },
        variables: { name: "" }
      });
    }
  }
  const [createNetworkSystem] = useMutation(CREATE_NETWORK_SYSTEM, optionsCreateNetworkSystem);

  /********* UPDATE NETWORK SYSTEM ***********/
  const optionsUpdateNetwork = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Rede alterada com Sucesso!',
      });
      setOpenAlert(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlert(true);
    },
    update(cache) {
      const getNetworkNameIncache = cache.readQuery({
        query: GET_NETWORK_NAME,
        variables: { name: networkNameFilter }
      });

      cache.writeQuery({
        query: GET_NETWORK_NAME,
        data: {
          getNetworkName: getNetworkNameIncache
        },
        variables: { name: networkNameFilter }
      });
    }
  }
  const [updateNetwork] = useMutation(UPDATE_NETWORK, optionsUpdateNetwork);

  /********* ACTIVATE NETWORK ***********/
  const optionsActivateNetwork = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Rede Ativada com Sucesso!',
      });
      setOpenAlert(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlert(true);
    },
    update(cache) {
      const getNetworkNameIncache = cache.readQuery({
        query: GET_NETWORK_NAME,
        variables: { name: networkNameFilter }
      });

      cache.writeQuery({
        query: GET_NETWORK_NAME,
        data: {
          getNetworkName: getNetworkNameIncache
        },
        variables: { name: networkNameFilter }
      });
    }
  }
  const [activateNetwork] = useMutation(ACTIVATE_NETWORK, optionsActivateNetwork);

  /********* DISABLE NETWORK ***********/
  const optionsDisableNetwork = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Rede Desativada com Sucesso!',
      });
      setOpenAlert(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlert(true);
    },
    update(cache) {
      const getNetworkNameIncache = cache.readQuery({
        query: GET_NETWORK_NAME,
        variables: { name: networkNameFilter }
      });

      cache.writeQuery({
        query: GET_NETWORK_NAME,
        data: {
          getNetworkName: getNetworkNameIncache
        },
        variables: { name: networkNameFilter }
      });
    }
  }
  const [disableNetwork] = useMutation(DISABLE_NETWORK, optionsDisableNetwork);

  /********* VERIFY NETWORK ***********/
  const optionsVerifyNetwork = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Rede Verificada com Sucesso!',
      });
      setOpenAlert(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlert(true);
    },
    update(cache) {
      const getNetworkNameIncache = cache.readQuery({
        query: GET_NETWORK_NAME,
        variables: { name: networkNameFilter }
      });

      cache.writeQuery({
        query: GET_NETWORK_NAME,
        data: {
          getNetworkName: getNetworkNameIncache
        },
        variables: { name: networkNameFilter }
      });
    }
  }
  const [verifyNetwork] = useMutation(VERIFY_NETWORK, optionsVerifyNetwork);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  useEffect(async () => {
    setLoadingUserPage(true);
    await getNetworkName({ variables: { name: networkNameFilter } });
  }, [networkNameFilter]);

  const handleSetNetworkNameFilter = text => {
    setNetworkNameFilter(text);
  }

  const handleCloseCreateNetworkModal = () => {
    setOpenCreateNetworkModal(false);
  }

  const handleOpenUpdateModal = network => {
    setNetworkUpdate(network);
    setOpenUpdateModal(true);
  }

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  }

  const handleCreateNewNetWork = async data => {
    if (userCurrent.isRoot) {
      await createNetworkSystem({ variables: { name: data.name } });
    } else {
      await createNetwork({ variables: { name: data.name } });
    }
  }

  const handleUpdateNetWork = async data => {
    await updateNetwork({ variables: { id: data.id, name: data.name } })
  }

  const handleActivateNetwork = network => {
    const data = {
      tilte: "Ativar Rede?",
      text: "Deseja realmente ATIVAR a rede?",
      object: network.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Rede Ativada!",
      textResult: `A Rede foi ativada com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => activateNetwork({ variables: { id: network.id } }));
  }

  const handleDisableNetwork = network => {
    const data = {
      tilte: "Desativar Rede?",
      text: "Deseja realmente DESATIVAR a rede?",
      object: network.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Rede Desativada!",
      textResult: `A Rede foi desativada com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => disableNetwork({ variables: { id: network.id } }));
  }

  const handleVerifyNetwork = async network => {
    const data = {
      tilte: "Verificar Rede?",
      text: "Deseja realmente VERIFICAR a rede?",
      object: network.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Rede Verificada!",
      textResult: `A Rede foi verificada com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => verifyNetwork({ variables: { id: network.id } }));
  }

  return (
    <>
      <Head>
        <title>
          Listar Redes | Material Kit
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
                Listar Redes
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setOpenCreateNetworkModal(true)}
                >
                  Adcionar
                </Button>
              </Box>
              {openAlert &&
                <AlertMessage configAlert={configAlert} open={openAlert} setOpen={setOpenAlert} />
              }
            </Box>
            <NetworkListToobar handleSetNetworkNameFilter={handleSetNetworkNameFilter} />
          </Box>
          <Box sx={{ mt: 3 }}>
            {loadingUserPage ?
              <LoadingSimple />
              :
              <NetworkList
                networks={networks}
                handleActivateNetwork={handleActivateNetwork}
                handleDisableNetwork={handleDisableNetwork}
                handleVerifyNetwork={handleVerifyNetwork}
                handleOpenUpdateModal={handleOpenUpdateModal}
              />
            }
          </Box>
        </Container>
      </Box>
      {openCreateNetworkModal &&
        <CreateNetworkModal
          open={openCreateNetworkModal}
          handleClose={handleCloseCreateNetworkModal}
          handleCreateNewNetWork={handleCreateNewNetWork}
          fullWidth={true}
          maxWidth={'md'}
        />
      }

      {openUpdateModal &&
        <UpdateNetworkModal
          network={networkUpdate}
          open={openUpdateModal}
          handleClose={handleCloseUpdateModal}
          handleUpdateNetWork={handleUpdateNetWork}
          fullWidth={true}
          maxWidth={'md'}
        />
      }
    </>
  )
};

ListNetworks.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ListNetworks;

export const getServerSideProps = async (ctx) => {
  return loggedInExceptMarket(ctx);
}
