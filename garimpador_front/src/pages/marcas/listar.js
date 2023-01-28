import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Button } from '@mui/material';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { BrandListToobar } from 'src/components/BrandsComponents/brand-list-toobar';
import { BrandList } from 'src/components/BrandsComponents/brand-list';

import loggedInExceptMarket from 'src/services/getServerSidePropsSystem/loggedInExceptMarket';

import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';
import CreateBrandModal from './CreateBrandModal';
import UpdateBrandModal from './UpdateBrandModal';
import { AlertCatch, AlertMessage, AlertsActivateOrDeactivate } from 'src/components/AlertsComponents';
import { useAuth } from 'src/context/authContext';
import { MESSAGE_ERROR_ALERT_CATCH } from 'src/config/constant';

import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_BRAND_NAME } from 'src/graphql/brands/query';
import { ACTIVATE_BRAND, CREATE_BRAND, CREATE_BRAND_SYSTEM, DISABLE_BRAND, UPDATE_BRAND, VERIFY_BRAND } from 'src/graphql/brands/mutation';

const ListBrands = () => {
  const [brands, setBrands] = useState([]);
  const [brandUpdate, setBrandUpdate] = useState({});
  const [brandNameFilter, setBrandNameFilter] = useState('');
  const [configAlert, setConfigAlert] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [openCreateBrandModal, setOpenCreateBrandModal] = useState(false);
  const [openUpdateBrandModal, setOpenUpdateBrandModal] = useState(false);
  const [loadingPage, setLoadingUserPage] = useState(true);
  const { userCurrent } = useAuth();


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* LIST BRANDS ***********/
  const optionsGetBrandsName = {
    onCompleted(data) {
      setBrands(data.getBrandName);
      setLoadingUserPage(loading);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
  }
  const [getBrandName, { loading }] = useLazyQuery(GET_BRAND_NAME, optionsGetBrandsName);

  /********* CREATE BRANDS ***********/
  const optionsCreateBrand = {
    onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsgArray: ['Marca cadastrada com Sucesso!', 'Aguarde o adiministrador validar a marca'],
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
      const getBrandNameIncache = cache.readQuery({
        query: GET_BRAND_NAME,
        variables: { name: "" }
      });

      cache.writeQuery({
        query: GET_BRAND_NAME,
        data: {
          getBrandName: [data.createBrand, ...getBrandNameIncache.getBrandName]
        },
        variables: { name: "" }
      });
    }
  }
  const [createBrand] = useMutation(CREATE_BRAND, optionsCreateBrand);

  /********* CREATE BRANDS SYSTEM ***********/
  const optionsCreateBrandSystem = {
    onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Marca cadastrada com Sucesso!',
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
      const getBrandNameIncache = cache.readQuery({
        query: GET_BRAND_NAME,
        variables: { name: "" }
      });

      cache.writeQuery({
        query: GET_BRAND_NAME,
        data: {
          getBrandName: [data.createBrandSystem, ...getBrandNameIncache.getBrandName]
        },
        variables: { name: "" }
      });
    }
  }
  const [createBrandSystem] = useMutation(CREATE_BRAND_SYSTEM, optionsCreateBrandSystem);

  /********* UPDATE BRANDS ***********/
  const optionsUpdateBrand = {
    onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Marca Aleterada com Sucesso!',
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
      const getBrandNameIncache = cache.readQuery({
        query: GET_BRAND_NAME,
        variables: { name: brandNameFilter }
      });

      cache.writeQuery({
        query: GET_BRAND_NAME,
        data: {
          getBrandName: getBrandNameIncache
        },
        variables: { name: brandNameFilter }
      });
    }
  }
  const [updateBrand] = useMutation(UPDATE_BRAND, optionsUpdateBrand);

  /********* ACTIVATE BRAND ***********/
  const optionsActivateBrand = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Marca Ativada com Sucesso!',
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
      const getBrandNameIncache = cache.readQuery({
        query: GET_BRAND_NAME,
        variables: { name: brandNameFilter }
      });

      cache.writeQuery({
        query: GET_BRAND_NAME,
        data: {
          getBrandName: getBrandNameIncache
        },
        variables: { name: brandNameFilter }
      });
    }
  }
  const [activateBrand] = useMutation(ACTIVATE_BRAND, optionsActivateBrand);

  /********* DISABLE BRAND ***********/
  const optionsDisableBrand = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Marca Desativada com Sucesso!',
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
      const getBrandNameIncache = cache.readQuery({
        query: GET_BRAND_NAME,
        variables: { name: brandNameFilter }
      });

      cache.writeQuery({
        query: GET_BRAND_NAME,
        data: {
          getBrandName: getBrandNameIncache
        },
        variables: { name: brandNameFilter }
      });
    }
  }
  const [disableBrand] = useMutation(DISABLE_BRAND, optionsDisableBrand);

  /********* VERIFY BRAND ***********/
  const optionsVerifyBrand = {
    async onCompleted() {
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Marca Verificada com Sucesso!',
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
      const getBrandNameIncache = cache.readQuery({
        query: GET_BRAND_NAME,
        variables: { name: brandNameFilter }
      });

      cache.writeQuery({
        query: GET_BRAND_NAME,
        data: {
          getBrandName: getBrandNameIncache
        },
        variables: { name: brandNameFilter }
      });
    }
  }
  const [verifyBrand] = useMutation(VERIFY_BRAND, optionsVerifyBrand);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  useEffect(() => {
    getBrandName({ variables: { name: brandNameFilter } })
  }, [brandNameFilter])


  const handleSetBrandNameFilter = text => {
    setBrandNameFilter(text);
  }

  const handleCloseCreateBrandModal = () => {
    setOpenCreateBrandModal(false);
  }

  const handleCloseUpdateBrandModal = () => {
    setOpenUpdateBrandModal(false);
  }

  const handleOpenUpdateBrandModal = brand => {
    setBrandUpdate(brand);
    setOpenUpdateBrandModal(true);
  }

  const handleCreateNewbrand = async data => {
    if (userCurrent.isRoot) {
      await createBrandSystem({ variables: { name: data.name, network_id: data.network } })
    } else {
      await createBrand({ variables: { name: data.name, network_id: data.network } })
    }
  }

  const handleUpdateBrand = async data => {
    const { id, name, network } = data;
    await updateBrand({ variables: { id, name, network_id: network } });
  }

  const handleActivateBrand = brand => {
    const data = {
      tilte: "Ativar Marca?",
      text: "Deseja realmente ATIVAR a marca?",
      object: brand.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Marca Ativada!",
      textResult: `A Marca foi ativada com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => activateBrand({ variables: { id: brand.id } }));
  }

  const handleDisableBrand = brand => {
    const data = {
      tilte: "Desativar Marca?",
      text: "Deseja realmente DESATIVAR a marca?",
      object: brand.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Marca Desativada!",
      textResult: `A Marca foi desativada com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => disableBrand({ variables: { id: brand.id } }));
  }

  const handleVerifyBrand = async brand => {
    const data = {
      tilte: "Verificar Marca?",
      text: "Deseja realmente VERIFICAR a marca?",
      object: brand.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Marca Verificada!",
      textResult: `A Marca foi verificada com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, () => verifyBrand({ variables: { id: brand.id } }));
  }

  return (
    <>
      <Head>
        <title>
          Listar Marcas | Material Kit
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
                Listar Marcas
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setOpenCreateBrandModal(true)}
                >
                  Adcionar
                </Button>
              </Box>
              {openAlert &&
                <AlertMessage configAlert={configAlert} open={openAlert} setOpen={setOpenAlert} />
              }
            </Box>
            <BrandListToobar handleSetBrandNameFilter={handleSetBrandNameFilter} />
          </Box>
          <Box sx={{ mt: 3 }}>
            {loadingPage ?
              <LoadingSimple />
              :
              <BrandList
                brands={brands}
                handleOpenUpdateBrandModal={handleOpenUpdateBrandModal}
                handleActivateBrand={handleActivateBrand}
                handleDisableBrand={handleDisableBrand}
                handleVerifyBrand={handleVerifyBrand}
              />
            }
          </Box>
        </Container>
      </Box>
      {openCreateBrandModal &&
        <CreateBrandModal
          open={openCreateBrandModal}
          handleClose={handleCloseCreateBrandModal}
          handleCreateNewBrand={handleCreateNewbrand}
          fullWidth={true}
          maxWidth={'md'}
        />
      }
      {openUpdateBrandModal &&
        <UpdateBrandModal
          open={openUpdateBrandModal}
          handleClose={handleCloseUpdateBrandModal}
          brand={brandUpdate}
          handleUpdateBrand={handleUpdateBrand}
          fullWidth={true}
          maxWidth={'md'}
        />
      }
    </>
  )
};

ListBrands.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ListBrands;

export const getServerSideProps = async (ctx) => {
  return loggedInExceptMarket(ctx);
}
