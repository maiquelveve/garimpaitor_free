import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Button } from '@mui/material';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { MarketplaceList } from 'src/components/MarketplacesComponents/marketplace-list';
import { MarketplaceListToobar } from 'src/components/MarketplacesComponents/marketplace-list-toobar';
import { MESSAGE_ERROR_ALERT_CATCH } from 'src/config/constant';
import { AlertCatch, AlertMessage, AlertsActivateOrDeactivate } from 'src/components/AlertsComponents';
import { useAuth } from 'src/context/authContext';
import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';
import loggedInExceptMarket from 'src/services/getServerSidePropsSystem/loggedInExceptMarket';

import CreateMarketplaceModal from './marketplaceModals/CreateMarketplaceModal';
import UpdateMarketplaceModal from './marketplaceModals/UpdateMarketplaceModal';

import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_MARKETPLACES_FILTERS } from 'src/graphql/marketplace/query';
import {
  CREATE_MARKETPLACE_SYSTEM,
  CREATE_MARKETPLACE,
  UPDATE_MARKETPLACE,
  DISABLE_MARKETPLACE_SYSTEM,
  ACTIVATE_MARKETPLACE_SYSTEM,
} from 'src/graphql/marketplace/mutation';
import { ACTIVATE_MARKETPLACE_USER, ADD_MARKETPLACE_USER, DISABLE_MARKETPLACE_USER } from 'src/graphql/marketplaceUser/mutation';

const ListMarketplaces = () => {
  const [configAlert, setConfigAlert] = useState({});
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [marketplaces, setMarketplaces] = useState([]);
  const [brand, setBrand] = useState('');
  const [network, setNetwork] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [city, setCity] = useState('');
  const [marketplaceUpdadeId, setMarketplaceUpdadeId] = useState('');
  const [openCreateMarketplaceModal, setOpenCreateMarketplaceModal] = useState(false);
  const [openUpdateMarketplaceModal, setOpenUpdateMarketplaceModal] = useState(false);
  const [loadingUserPage, setLoadingUserPage] = useState(true);
  const { userCurrent } = useAuth();


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* GET MARKETPLACE FILTER  ***********/
  const optionsGetMarketplacesFilters = {
    onCompleted(data) {
      setMarketplaces(data.getMarketplaceFilters ? data.getMarketplaceFilters : []);
      setLoadingUserPage(loading);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    }
  }
  const [getMarketplaceFilters, { loading }] = useLazyQuery(GET_MARKETPLACES_FILTERS, optionsGetMarketplacesFilters);

  /********* CREATE MARKETPLACE SYSTEM  ***********/
  const optionCreateMarketplaceSystem = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Mercado cadastrado com Sucesso!',
      });
      setOpenAlertSuccess(true);
      handleCloseCreateMarketplaceModal();
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlertError(true);
    },
    update(cache, { data }) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: [data.createMarketplaceSystem, ...getMarketplaceFiltersIncache.getMarketplaceFilters]
        },
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });
    }
  }
  const [createMarketplaceSystem] = useMutation(CREATE_MARKETPLACE_SYSTEM, optionCreateMarketplaceSystem);

  /********* CREATE MARKETPLACE USER  ***********/
  const optionCreateMarketplace = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Mercado cadastrado com Sucesso!',
      });
      setOpenAlertSuccess(true);
      handleCloseCreateMarketplaceModal();
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlertError(true);
    },
    update(cache, { data }) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: [data.createMarketplace, ...getMarketplaceFiltersIncache.getMarketplaceFilters]
        },
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });
    }
  }
  const [createMarketplace] = useMutation(CREATE_MARKETPLACE, optionCreateMarketplace);

  /********* UPDATE MARKETPLACE ROOT  ***********/
  const optionUpdateMarketplace = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Mercado alterado com Sucesso!',
      });
      setOpenAlertSuccess(true);
      handleCloseUpdateMarketplaceModal();
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlertError(true);
    },
    update(cache, { data }) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: [data.updateMarketplace, ...getMarketplaceFiltersIncache.getMarketplaceFilters]
        },
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });
    }
  }
  const [updateMarketplace] = useMutation(UPDATE_MARKETPLACE, optionUpdateMarketplace);

  /********* DISABLE MARKETPLACE SYSTEM ***********/
  const optionsDisableMarketplaceSystem = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Mercado Desativado com Sucesso!',
      });
      setOpenAlertSuccess(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlertError(true);
    },
    update(cache, { data }) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: [data.disableMarketplaceSystem, ...getMarketplaceFiltersIncache.getMarketplaceFilters]
        },
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });
    }
  }
  const [disableMarketplaceSystem] = useMutation(DISABLE_MARKETPLACE_SYSTEM, optionsDisableMarketplaceSystem);

  /********* ACTIVATE MARKETPLACE SYSTEM ***********/
  const optionsActiveMarketplaceSystem = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Mercado Ativado com Sucesso!',
      });
      setOpenAlertSuccess(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlertError(true);
    },
    update(cache, { data }) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: [data.activateMarketplaceSystem, ...getMarketplaceFiltersIncache.getMarketplaceFilters]
        },
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });
    }
  }
  const [activateMarketplaceSystem] = useMutation(ACTIVATE_MARKETPLACE_SYSTEM, optionsActiveMarketplaceSystem);

  /********* ACTIVATE MARKETPLACE USER ***********/
  const optionsActiveMarketplaceUser = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Mercado Ativado com Sucesso para você!',
      });
      setOpenAlertSuccess(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlertError(true);
    },
    update(cache, { data }) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: [data.activateMarketplaceUser, ...getMarketplaceFiltersIncache.getMarketplaceFilters]
        },
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });
    }
  }
  const [activateMarketplaceUser] = useMutation(ACTIVATE_MARKETPLACE_USER, optionsActiveMarketplaceUser);

  /********* DISABLE MARKETPLACE USER ***********/
  const optionsDisableMarketplaceUser = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Mercado Desativado com Sucesso para você!',
      });
      setOpenAlertSuccess(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlertError(true);
    },
    update(cache, { data }) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: [data.disableMarketplaceUser, ...getMarketplaceFiltersIncache.getMarketplaceFilters]
        },
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });
    }
  }
  const [disableMarketplaceUser] = useMutation(DISABLE_MARKETPLACE_USER, optionsDisableMarketplaceUser);

  /********* ADD MARKETPLACE USER ***********/
  const optionsAddMarketplaceUser = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Mercado Desativado com Sucesso para você!',
      });
      setOpenAlertSuccess(true);
    },
    onError(error) {
      setConfigAlert({
        error,
        type: 'ERROR',
      });
      setOpenAlertError(true);
    },
    update(cache, { data }) {
      const getMarketplaceFiltersIncache = cache.readQuery({
        query: GET_MARKETPLACES_FILTERS,
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });

      cache.writeQuery({
        query: GET_MARKETPLACES_FILTERS,
        data: {
          getMarketplaceFilters: [data.addMarketplaceUser, ...getMarketplaceFiltersIncache.getMarketplaceFilters]
        },
        variables: { brand: "", network: "", cnpj: "", city: "" }
      });
    }
  }
  const [addMarketplaceUser] = useMutation(ADD_MARKETPLACE_USER, optionsAddMarketplaceUser);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  useEffect(async () => {
    setLoadingUserPage(true);
    await getMarketplaceFilters({ variables: { brand, network, cnpj, city } });
  }, [brand, network, cnpj, city]);

  const handleSetBrandFilter = value => {
    setBrand(value);
  }

  const handleSetNetworkFilter = value => {
    setNetwork(value);
  }

  const handleSetCityFilter = value => {
    setCity(value);
  }

  const handleSetCnpjFilter = value => {
    setCnpj(value);
  }

  const handleCloseCreateMarketplaceModal = () => {
    setOpenCreateMarketplaceModal(false);
  }

  const handleCreateMarketplace = async data => {
    const variables = {
      ...data,
      brand_id: data.brand,
      city_id: data.city,
    };

    if (userCurrent.isRoot) {
      await createMarketplaceSystem({ variables });
    } else {
      await createMarketplace({ variables });
    }
  }

  const handleCloseUpdateMarketplaceModal = () => {
    setOpenUpdateMarketplaceModal(false);
  }

  const handleOpenUpdateMarketplaceModal = id => {
    setMarketplaceUpdadeId(id)
    setOpenUpdateMarketplaceModal(true);
  }

  const handleUpdateMarketplace = async (data) => {
    const variables = {
      ...data,
      brand_id: data.brand,
      city_id: data.city,
    }
    await updateMarketplace({ variables });
  }

  const handleDisableMarketplaceSystem = marketplace => {
    const data = {
      tilte: "Desativar Mercado?",
      text: "Deseja realmente DESATIVAR o Mercado?",
      object: marketplace.brand.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Mercado Desativado!",
      textResult: `O Mercado foi desativado com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => disableMarketplaceSystem({ variables: { id: marketplace.id } }));
  }

  const handleActivateMarketplaceSystem = marketplace => {
    const data = {
      tilte: "Ativar Mercado?",
      text: "Deseja realmente ATIVAR o Mercado?",
      object: marketplace.brand.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Mercado Ativado!",
      textResult: `O Mercado foi Ativado com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => activateMarketplaceSystem({ variables: { id: marketplace.id } }));
  }

  const handleActivateMarketplaceUser = marketplace => {
    const data = {
      tilte: "Ativar Mercado para o você?",
      text: "Deseja realmente ATIVAR o Mercado para o você?",
      object: marketplace.brand.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Mercado Ativado!",
      textResult: `O Mercado foi Ativado com sucesso para você`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => activateMarketplaceUser({ variables: { id: marketplace.id } }));
  }

  const handleDisableMarketplaceUser = marketplace => {
    const data = {
      tilte: "Desativar Mercado para você?",
      text: "Deseja realmente DESATIVAR o Mercado para você?",
      object: marketplace.brand.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Mercado Desativado!",
      textResult: `O Mercado foi desativado com sucesso para você`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => disableMarketplaceUser({ variables: { id: marketplace.id } }));
  }

  const handleAddMarketplaceUser = marketplace => {
    const variables = {
      user_id: userCurrent.id,
      marketplace_id: marketplace.id
    }

    const data = {
      tilte: "Adicionar Mercado para o você?",
      text: "Deseja realmente ADICIONAR o Mercado para o você?",
      object: marketplace.brand.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Mercado Adicionar!",
      textResult: `O Mercado foi Adicionar com sucesso para você`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => addMarketplaceUser({ variables }));
  }

  return (
    <>
      <Head>
        <title>
          Listar Mercados | Material Kit
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
                Listar Mercados
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setOpenCreateMarketplaceModal(true)}
                >
                  Adcionar
                </Button>
              </Box>
              {openAlertSuccess &&
                <AlertMessage configAlert={configAlert} open={openAlertSuccess} setOpen={setOpenAlertSuccess} />
              }
            </Box>
            <MarketplaceListToobar
              handleSetBrandFilter={handleSetBrandFilter}
              handleSetNetworkFilter={handleSetNetworkFilter}
              handleSetCityFilter={handleSetCityFilter}
              handleSetCnpjFilter={handleSetCnpjFilter}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            {loadingUserPage ?
              <LoadingSimple />
              :
              <MarketplaceList
                marketplaces={marketplaces}
                handleOpenUpdateMarketplaceModal={handleOpenUpdateMarketplaceModal}
                handleDisableMarketplaceSystem={handleDisableMarketplaceSystem}
                handleActivateMarketplaceSystem={handleActivateMarketplaceSystem}
                handleActivateMarketplaceUser={handleActivateMarketplaceUser}
                handleDisableMarketplaceUser={handleDisableMarketplaceUser}
                handleAddMarketplaceUser={handleAddMarketplaceUser}
              />
            }
          </Box>
        </Container>
      </Box>
      {openCreateMarketplaceModal &&
        <CreateMarketplaceModal
          openAlertError={openAlertError}
          setOpenAlertError={setOpenAlertError}
          configAlert={configAlert}
          open={openCreateMarketplaceModal}
          handleClose={handleCloseCreateMarketplaceModal}
          handleCreateMarketplace={handleCreateMarketplace}
          fullWidth={true}
          maxWidth={'md'}
        />
      }
      {openUpdateMarketplaceModal &&
        <UpdateMarketplaceModal
          openAlertError={openAlertError}
          setOpenAlertError={setOpenAlertError}
          configAlert={configAlert}
          open={openUpdateMarketplaceModal}
          handleClose={handleCloseUpdateMarketplaceModal}
          handleUpdateMarketplace={handleUpdateMarketplace}
          marketplaceId={marketplaceUpdadeId}
          fullWidth={true}
          maxWidth={'md'}
        />
      }
    </>
  )
};

ListMarketplaces.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ListMarketplaces;

export const getServerSideProps = async (ctx) => {
  return loggedInExceptMarket(ctx);
}
