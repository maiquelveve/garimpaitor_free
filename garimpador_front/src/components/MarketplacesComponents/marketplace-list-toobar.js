import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import useDebounce from 'src/utils/useDebounce';
import { serializeCnpj, formatMaskCnpj } from 'src/utils/helpersText';

export const MarketplaceListToobar = (props) => {
  const [cnpjLocal, setCnpjLocal] = useState('');

  const {
    handleSetBrandFilter,
    handleSetNetworkFilter,
    handleSetCityFilter,
    handleSetCnpjFilter
  } = props;

  const debouncedBrand = useDebounce(handleSetBrandFilter, 800);
  const debouncedNetwork = useDebounce(handleSetNetworkFilter, 800);
  const debouncedCity = useDebounce(handleSetCityFilter, 800);

  const handleBrandFilter = value => {
    debouncedBrand(value);
  }

  const handleNetworkFilter = value => {
    debouncedNetwork(value);
  }

  const handleCityFilter = value => {
    debouncedCity(value);
  }

  const handleCnpjFilter = value => {
    if (value.length < 18) {
      handleSetCnpjFilter("");
    }

    setCnpjLocal(value);

    if (value.length === 18) {
      handleSetCnpjFilter(serializeCnpj(value));
    }
  }

  return (
    <Box sx={{ mt: 3 }} >
      <Card>
        <CardContent>
          <Grid container>
            <Grid item lg={3} md={6} sm={12} xs={12} mb={1} >
              <Box sx={{ mr: 2 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  onChange={e => handleBrandFilter(e.target.value)}
                  placeholder="Pesquisar Mercado"
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12} mb={1}>
              <Box sx={{ mr: 2 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  onChange={e => handleNetworkFilter(e.target.value)}
                  placeholder="Pesquisar Rede"
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12} mb={1}>
              <Box sx={{ mr: 2 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  onChange={e => handleCityFilter(e.target.value)}
                  placeholder="Pesquisar Cidade"
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={12} xs={12} mb={1}>
              <Box sx={{ mr: 2 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  value={cnpjLocal}
                  onChange={e => handleCnpjFilter(formatMaskCnpj(e.target.value))}
                  placeholder="Pesquisar CNPJ"
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box >
  );
}
