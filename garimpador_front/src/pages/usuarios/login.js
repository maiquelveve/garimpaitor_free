import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { AlertMessage } from 'src/components/AlertsComponents';

import { useLazyQuery } from '@apollo/client'
import { LOGIN } from 'src/graphql/users/query';

import { useAuth } from 'src/context/authContext';
import LoadingBasic from 'src/components/LoadingComponent/LoadingBasic';
import notInLogged from 'src/services/getServerSidePropsSystem/notInLogged';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [configAlert, setConfigAlert] = useState({});
  const router = useRouter();
  const { setToken, setUserCurrent } = useAuth();

  const options = {
    onCompleted(data) {
      setToken(data.login.token);
      setUserCurrent(data.login);
      router.push('/');
    },
    onError(error) {
      setOpen(true);
      setConfigAlert({
        error,
        type: 'ERROR',
      });
    }
  }
  const [login, { loading }] = useLazyQuery(LOGIN, options);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Email invalido')
        .max(255)
        .required('Email é obrigatório'),
      password: Yup
        .string()
        .max(255)
        .required('Senha é obrigatório')
    }),
    onSubmit: async ({ email, password }) => {
      await login({ variables: { email, password } })
    }
  });

  return (
    <>
      <Head>
        <title>Entrar | Garimpaitor</title>
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
              Inico
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
                Entrar
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Faça seu login no sistema
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                Informe suas credenciais de acesso
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
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Senha"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
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
                {!loading ? "ENTRAR" : <LoadingBasic size={25} />}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Não é cadastrado?
                {' '}
                <NextLink
                  href="/usuarios/cadastrar"
                >
                  <Link
                    to="/usuarios/cadastrar"
                    variant="subtitle2"
                    underline="hover"
                    sx={{
                      cursor: 'pointer'
                    }}
                  >
                    Cadastre-se
                  </Link>
                </NextLink>
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                <NextLink
                  href="/usuarios/esqueciMinhaSenha "
                >
                  <Link
                    to="/usuarios/cadastrar"
                    variant="subtitle2"
                    underline="hover"
                    sx={{
                      cursor: 'pointer'
                    }}
                  >
                    Esqueci minha senha
                  </Link>
                </NextLink>
              </Typography>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;

export const getServerSideProps = async (ctx) => {
  return notInLogged(ctx);
}
