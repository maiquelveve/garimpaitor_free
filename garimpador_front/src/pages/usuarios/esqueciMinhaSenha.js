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
import notInLogged from 'src/services/getServerSidePropsSystem/notInLogged';
import { AlertMessage } from 'src/components/AlertsComponents';

import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from 'src/graphql/users/mutation';


const Register = () => {
  const [open, setOpen] = useState(false);
  const [configAlert, setConfigAlert] = useState({});

  const options = {
    onCompleted() {
      setOpen(true);
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Nova senha enviada para o email!'
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

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, options);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Email invalido')
        .max(255)
        .required('Email é obrigatório'),
    }),
    onSubmit: async (values) => {
      const { email } = values;
      const returnedDataSuccessfully = await resetPassword({ variables: { email } });

      if (returnedDataSuccessfully.data) {
        values.email = "";
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Esqueci Minha Senha | Garimpaitor
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
                Recuperar Senha
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Informe o Email de Acesso
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
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
                {!loading ? "ENVIAR" : <LoadingSimple size={25} />}
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
  return notInLogged(ctx);
}
