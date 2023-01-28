import { useState, useEffect } from 'react';
import { Grid, TextField, Box, useMediaQuery, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';
import { formatMaskCep } from 'src/utils/helpersText';
import { AlertCatch } from 'src/components/AlertsComponents';
import { MenuProps, getStyles } from 'src/config/propsConfigSelects';
import { MESSAGE_ERROR_ALERT_CATCH } from 'src/config/constant';

import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_CITYS, GET_STATES } from 'src/graphql/address/query';

export default function FormAddressMarketplace({ formik, ...props }) {
  const theme = useTheme();
  const [states, setStates] = useState([]);
  const [citys, setCitys] = useState([]);

  const spacingControl = useMediaQuery((theme) => theme.breakpoints.up('md')) ? 3 : 0;


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* GET STATES ***********/
  const optionGetStates = {
    onCompleted(data) {
      setStates(data.getStates);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
  }
  const { loading: loadingStates } = useQuery(GET_STATES, optionGetStates);

  /********* GET CITYS FOR STATE  ***********/
  const optionGetCitys = {
    onCompleted(data) {
      setCitys(data.getCitys);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
  }
  const [getCitys, { loading: loadingCity }] = useLazyQuery(GET_CITYS, optionGetCitys);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  const findCity = async state_id => {
    formik.setFieldValue("city", '');
    setCitys([]);

    if (state_id) {
      await getCitys({ variables: { state_id } });
    }
  }

  useEffect(async () => {
    if (formik.values.city) {
      const state_id = formik.values.state
      await getCitys({ variables: { state_id } });
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...props
      }}
    >
      <Grid container spacing={spacingControl}>
        <Grid item md={4} xs={12} >
          <TextField
            error={Boolean(formik.touched.cep && formik.errors.cep)}
            fullWidth
            value={formatMaskCep(formik.values.cep)}
            helperText={formik.touched.cep && formik.errors.cep}
            label="CEP"
            margin="normal"
            name="cep"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item md={8} xs={12} >
          <TextField
            error={Boolean(formik.touched.complement && formik.errors.complement)}
            fullWidth
            helperText={formik.touched.complement && formik.errors.complement}
            label="Complemento"
            margin="normal"
            name="complement"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.complement}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={spacingControl}>
        <Grid item md={4} xs={12} >
          <TextField
            error={Boolean(formik.touched.street && formik.errors.street)}
            fullWidth
            helperText={formik.touched.street && formik.errors.street}
            label="Rua"
            margin="normal"
            name="street"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.street}
            variant="outlined"
          />
        </Grid>
        <Grid item md={2} xs={12} >
          <TextField
            error={Boolean(formik.touched.number && formik.errors.number)}
            fullWidth
            helperText={formik.touched.number && formik.errors.number}
            label="Número"
            margin="normal"
            name="number"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.number}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12} >
          <TextField
            error={Boolean(formik.touched.neighborhood && formik.errors.neighborhood)}
            fullWidth
            helperText={formik.touched.neighborhood && formik.errors.neighborhood}
            label="Bairro"
            margin="normal"
            name="neighborhood"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.neighborhood}
            variant="outlined"
          />
        </Grid>
      </Grid>
      {loadingStates ? <LoadingSimple title={"Carregando os Estados"} /> :
        <Grid container spacing={spacingControl}>
          <Grid item md={6} xs={12} >
            <TextField
              select
              onChange={e => {
                formik.handleChange(e);
                findCity(e.target.value)
              }}
              fullWidth
              error={Boolean(formik.touched.state && formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              label="Estado"
              margin="normal"
              name="state"
              onBlur={formik.handleBlur}
              value={formik.values.state}
              variant="outlined"
              SelectProps={{
                MenuProps
              }}
            >
              {states.map(state => (
                <MenuItem
                  key={state.id}
                  value={state.id}
                  style={getStyles(state.id, formik.values.state, theme)}
                >
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={6} xs={12} >
            {loadingCity ? <LoadingSimple /> :
              <TextField
                select
                onChange={formik.handleChange}
                error={Boolean(formik.touched.city && formik.errors.city)}
                fullWidth
                helperText={formik.touched.city && formik.errors.city}
                label="Cidade"
                margin="normal"
                name="city"
                onBlur={formik.handleBlur}
                value={formik.values.city}
                variant="outlined"
                SelectProps={{
                  MenuProps
                }}
              >
                {citys.map(city => (
                  <MenuItem
                    key={city.id}
                    value={city.id}
                    style={getStyles(city.id, formik.values.city, theme)}
                  >
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
            }
          </Grid>
        </Grid>
      }
    </Box >
  );
}
