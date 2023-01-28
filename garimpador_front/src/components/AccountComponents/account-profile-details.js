import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from 'src/graphql/users/mutation';
import { GET_USER_BY_TOKEN } from 'src/graphql/users/query';

import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';
import LoadingBasic from '../LoadingComponent/LoadingBasic';
import { AlertCatch } from 'src/components/AlertsComponents';
import { formatTextName } from 'src/utils/helpersText';
import { useAuth } from 'src/context/authContext';
import { MESSAGE_ERROR_ALERT_CATCH } from 'src/config/constant';

export const AccountProfileDetails = ({ setConfigAlert, setOpen, ...props }) => {
  const { userCurrent, setUserCurrent } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Email Invalido')
        .max(150, 'Email não pode ser maior de 150 caracteres')
        .min(3, 'Email deve ter no mímino 8 caracteres')
        .required('Email é obrigatório'),
      name: Yup
        .string()
        .max(150, 'Nome não pode ser maior de 150 caracteres')
        .min(8, 'Nome deve ter no mímino 3 caracteres')
        .required('Nome é obrigatório')
    }),
    onSubmit: async (values) => {
      const { name, email } = values;
      updateUser({ ...optionsMutation, variables: { id: userCurrent.id, name, email } })
      setUserCurrent({ ...userCurrent, name, email });
    }
  });

  const optionsMutation = {
    onCompleted() {
      setOpen(true);
      setConfigAlert({
        type: 'SUCCESS',
        textMsg: 'Usuário Alterado com Sucesso!'
      });
    },
    onError(error) {
      setOpen(true);
      setConfigAlert({
        error,
        type: 'ERROR',
      });
    }
  }
  const [updateUser] = useMutation(UPDATE_USER);

  const optionsQuery = {
    onCompleted(data) {
      formik.setFieldValue("name", formatTextName(data.getUserByToken.name));
      formik.setFieldValue("email", data.getUserByToken.email.toLowerCase());
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
  }
  const { loading: loadingQuery } = useQuery(GET_USER_BY_TOKEN, optionsQuery);

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Altere os seus dados"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {loadingQuery ?
              <Grid
                item
                md={12}
                xs={12}
              >
                <LoadingSimple title={'Carregando os Dados'} titleColor="black" />
              </Grid>
              :
              <>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
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
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
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
                </Grid>
              </>
            }
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          {loadingQuery ? <LoadingBasic size={47} /> :
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              size="large"
              type="submit"
              variant="contained"
            >
              SALVAR
            </Button>
          }
        </Box>
      </Card>
    </form>
  );
};
