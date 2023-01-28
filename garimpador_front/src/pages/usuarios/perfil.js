import { useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../../components/AccountComponents/account-profile';
import { AccountProfileDetails } from '../../components/AccountComponents/account-profile-details';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AlertMessage, AlertsActivateOrDeactivate } from 'src/components/AlertsComponents';
import { useAuth } from 'src/context/authContext';
import loggedInAllUsers from 'src/services/getServerSidePropsSystem/loggedInAllUsers';

import { useMutation } from '@apollo/client';
import { DISABLE_USER } from 'src/graphql/users/mutation';

const Account = () => {
  const [open, setOpen] = useState(false);
  const [configAlert, setConfigAlert] = useState({});
  const { userCurrent, logout } = useAuth()

  const options = {
    onCompleted() {
      setOpen(true);
      setConfigAlert({
        type: 'SUCCESS',
        textMsgArray: ['Usuário Desativado com Sucesso!', 'Você será deslogado em 5 segundos!']
      });
      setTimeout(logout, 5000);
    },
    onError(error) {
      setOpen(true);
      setConfigAlert({
        error,
        type: 'ERROR',
      });
    },
  }
  const [disableUser] = useMutation(DISABLE_USER, options);

  const handleDeactive = () => {
    const data = {
      tilte: "Desativar Usuário?",
      text: "Deseja realmente DESATIVAR o usuário?",
      object: userCurrent.name,
      btnTextCancel: "NÃO",
      btnTextConfirm: "SIM",
      titleResult: "Usuário Desativado!",
      textResult: `O usuario foi desativado com sucesso`,
      btnTextResult: "OK"
    }
    AlertsActivateOrDeactivate(data, async () => await disableUser({ variables: { id: userCurrent.id } }));
  }

  return (
    <>
      <Head>
        <title>
          Perfil | Garimpaitor
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
            <Typography
              sx={{ mb: 3 }}
              variant="h4"
            >
              Meu Perfil
            </Typography>
            <Button color="error" onClick={handleDeactive}>DESATIVAR</Button>
          </Box>
          {open &&
            <AlertMessage
              open={open}
              setOpen={setOpen}
              configAlert={configAlert}
            />
          }
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails setConfigAlert={setConfigAlert} setOpen={setOpen} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;

export const getServerSideProps = async (ctx) => {
  return loggedInAllUsers(ctx);
}
