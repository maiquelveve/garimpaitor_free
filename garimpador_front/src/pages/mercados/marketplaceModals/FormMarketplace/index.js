import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { Box, Paper, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ApartmentIcon from '@mui/icons-material/Apartment';

import FormDataMarketplace from 'src/pages/mercados/marketplaceModals/FormMarketplace/FormDataMarketplace';
import FormGroupMarketplace from 'src/pages/mercados/marketplaceModals/FormMarketplace/FormGroupMarketplace';
import FormAddressMarketplace from 'src/pages/mercados/marketplaceModals/FormMarketplace/FormAddressMarketplace';

export default function FormMarketplace({ formik, ...props }) {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const lgMx = useMediaQuery((theme) => theme.breakpoints.up('lg')) ? { mx: 14 } : {};
  const mdMx = useMediaQuery((theme) => theme.breakpoints.only('md')) ? { mx: 13 } : {};
  const smMx = useMediaQuery((theme) => theme.breakpoints.only('sm')) ? { mx: 4 } : {};
  const xsMx = useMediaQuery((theme) => theme.breakpoints.only('xs')) ? { mx: 2 } : {};
  const mxMediaQuery = { ...lgMx, ...mdMx, ...smMx, ...xsMx }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...props
      }}
    >
      <Paper sx={{ overflow: 'hidden' }}>
        <TabContext value={value}>
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" variant='fullWidth'>
              <Tab icon={<LocalGroceryStoreIcon />} value="1" label="MERCADO" sx={{ mx: mxMediaQuery.mx }} />
              <Tab icon={<ApartmentIcon />} value="2" label="GRUPO" sx={{ mx: mxMediaQuery.mx }} />
              <Tab icon={<EditLocationAltIcon />} value="3" label="ENDEREÇO" sx={{ mx: mxMediaQuery.mx }} />
            </TabList>
          </Box>
          <TabPanel value="1"><FormDataMarketplace formik={formik} /></TabPanel>
          <TabPanel value="2"><FormGroupMarketplace formik={formik} /></TabPanel>
          <TabPanel value="3"><FormAddressMarketplace formik={formik} /></TabPanel>
        </TabContext>
      </Paper>
    </Box>
  );
}
