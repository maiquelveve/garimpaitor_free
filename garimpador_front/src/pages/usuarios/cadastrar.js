import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import notInLogged from 'src/services/getServerSidePropsSystem/notInLogged';
import { AlertMessage } from 'src/components/AlertsComponents';
import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from 'src/graphql/users/mutation';


const Register = () => {
  const [open, setOpen] = useState(false);
  const [configAlert, setConfigAlert] = useState({});

  const options = {
    onCompleted() {
      setOpen(true);
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Usuário Cadastrado com Sucesso!'
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

  const [createUser, { loading }] = useMutation(CREATE_USER, options);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Email Invalido')
        .max(150, 'Email não pode ser maior de 150 caracteres')
        .min(8, 'Email deve ter no mímino 8 caracteres')
        .required('Email é obrigatório'),
      name: Yup
        .string()
        .max(150, 'Nome não pode ser maior de 150 caracteres')
        .min(3, 'Nome deve ter no mímino 3 caracteres')
        .required('Nome é obrigatório'),
      password: Yup
        .string()
        .max(150, 'Senha não pode ser maior de 100 caracteres')
        .min(5, 'Senha deve ter no mímino 6 caracteres')
        .required('Senha é obrigatório'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'Aceite os termos e condições'
        )
    }),
    onSubmit: async (values) => {
      const { name, email, password } = values;
      const returnedDataSuccessfully = await createUser({ variables: { name, email, password } });

      if (returnedDataSuccessfully.data) {
        values.name = "";
        values.email = "";
        values.password = "";
        values.policy = false;
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Cadastrar | Garimpaitor
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
                Criar nova conta
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Informe os dados do usuário
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nome"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
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
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Lei e aceite os
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    Termos e Condições
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {!loading ? "ENTRAR" : <LoadingSimple size={25} />}
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Já possui uma conta?
              {' '}
              <NextLink
                href="/usuarios/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Entrar
                </Link>
              </NextLink>
            </Typography>
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
