import { useState, useEffect } from 'react';
import { Grid, TextField, Box, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { MenuProps, getStyles } from 'src/config/propsConfigSelects';
import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';
import { AlertCatch } from 'src/components/AlertsComponents';
import { MESSAGE_ERROR_ALERT_CATCH } from 'src/config/constant';

import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_NETWORKS } from 'src/graphql/networks/query';
import { GET_FOR_NETWORK } from 'src/graphql/brands/query';

export default function FormGroupMarketplace({ formik, ...props }) {
  const theme = useTheme();
  const [networks, setNetworks] = useState([]);
  const [brands, setBrands] = useState([]);


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* GET NETWORKS ***********/
  const optionGetAllNettworks = {
    onCompleted(data) {
      setNetworks(data.getAllNetworks);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
    fetchPolicy: 'network-only'
  }
  const { loading: loadingNetworks } = useQuery(GET_ALL_NETWORKS, optionGetAllNettworks);

  /********* GET BRANDS FOR NETWORK ***********/
  const optionGetForNetworksBrands = {
    onCompleted(data) {
      setBrands(data.getForNetwork);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
    fetchPolicy: 'network-only'
  }
  const [getForNetwork, { loading: loadingBrand }] = useLazyQuery(GET_FOR_NETWORK, optionGetForNetworksBrands);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  const findBrands = async network_id => {
    formik.setFieldValue("brand", '');
    setBrands([]);

    if (network_id) {
      await getForNetwork({ variables: { network_id } });
    }
  }

  useEffect(async () => {
    if (formik.values.brand) {
      const network_id = formik.values.network
      await getForNetwork({ variables: { network_id } });
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...props
      }}
    >
      {loadingNetworks ? <LoadingSimple title={'Carregando as Redes'} /> :
        <Grid container spacing={3} >
          <Grid item lg={6} xs={12} sx={{ mt: 2 }} >
            <TextField
              select
              label="Rede"
              value={formik.values.network}
              onChange={e => {
                formik.handleChange(e);
                findBrands(e.target.value)
              }}
              fullWidth
              variant="outlined"
              error={Boolean(formik.touched.network && formik.errors.network)}
              helperText={formik.touched.network && formik.errors.network}
              margin="normal"
              name="network"
              onBlur={formik.handleBlur}
              SelectProps={{
                MenuProps
              }}
            >
              {networks.map(network => (
                <MenuItem
                  key={network.id}
                  value={network.id}
                  style={getStyles(network.id, formik.values.network, theme)}
                >
                  {network.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item lg={6} xs={12} sx={{ mt: 2 }} >
            {loadingBrand ? <LoadingSimple /> :
              <TextField
                select
                label="Marcas"
                value={formik.values.brand}
                onChange={formik.handleChange}
                fullWidth
                variant="outlined"
                error={Boolean(formik.touched.brand && formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
                margin="normal"
                name="brand"
                onBlur={formik.handleBlur}
                SelectProps={{
                  MenuProps,
                }}
              >
                <MenuItem
                  key={""}
                  value={""}
                >
                  <em>Selecionar Marca</em>
                </MenuItem>
                {brands.map(brand => (
                  <MenuItem
                    key={brand.id}
                    value={brand.id}
                    style={getStyles(brand.id, formik.values.brand, theme)}
                  >
                    {brand.name}
                  </MenuItem>
                ))}
              </TextField>
            }
          </Grid>
        </Grid>
      }
    </Box>
  );
}
