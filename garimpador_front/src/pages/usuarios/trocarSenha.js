import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';
import loggedInAllUsers from 'src/services/getServerSidePropsSystem/loggedInAllUsers';
import { useAuth } from 'src/context/authContext';
import { AlertMessage } from 'src/components/AlertsComponents';

import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from 'src/graphql/users/mutation';

const Register = () => {
  const [open, setOpen] = useState(false);
  const [configAlert, setConfigAlert] = useState({});
  const { userCurrent } = useAuth();

  const options = {
    onCompleted() {
      setOpen(true);
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Senha Alterada com Sucesso!'
      });
    },
    onError(error) {
      setOpen(true);
      setConfigAlert({
        error,
        type: 'ERROR',
      });
    }
  };

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, options);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeattNewPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup
        .string()
        .max(150, 'Senha não pode ser maior de 100 caracteres')
        .min(5, 'Senha deve ter no mímino 6 caracteres')
        .required('Senha é obrigatório'),
      newPassword: Yup
        .string()
        .max(150, 'Nova Senha não pode ser maior de 100 caracteres')
        .min(5, 'Nova Senha deve ter no mímino 6 caracteres')
        .required('Nova Senha é obrigatório'),
      repeattNewPassword: Yup
        .string()
        .required('Repitir a Senha é obrigatório')
        .oneOf([Yup.ref('newPassword'), null], 'Nova Senha diferente do Repita Senha'),
    }),
    onSubmit: async (values) => {
      const { currentPassword, newPassword } = values;
      const returnedDataSuccessfully = await changePassword({ variables: { id: userCurrent.id, currentPassword, newPassword } });

      if (returnedDataSuccessfully.data) {
        values.currentPassword = "";
        values.newPassword = "";
        values.repeattNewPassword = "";
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Trocar Senha | Garimpaitor
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Inicio
            </Button>
          </NextLink>
          {open &&
            <AlertMessage
              open={open}
              setOpen={setOpen}
              configAlert={configAlert}
            />
          }
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Trocar Senha
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Informe os dados
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.currentPassword && formik.errors.currentPassword)}
              fullWidth
              helperText={formik.touched.currentPassword && formik.errors.currentPassword}
              label="Senha Atual"
              margin="normal"
              name="currentPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.currentPassword}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
              fullWidth
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              label="Nova Senha"
              margin="normal"
              name="newPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.newPassword}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.repeattNewPassword && formik.errors.repeattNewPassword)}
              fullWidth
              helperText={formik.touched.repeattNewPassword && formik.errors.repeattNewPassword}
              label="Repita Nova Senha"
              margin="normal"
              name="repeattNewPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.repeattNewPassword}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {!loading ? "TROCAR SENHA" : <LoadingSimple size={25} />}
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;

export const getServerSideProps = async (ctx) => {
  return loggedInAllUsers(ctx);
}
