import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import useDebounce from 'src/utils/useDebounce';

export const BrandListToobar = ({ handleSetBrandNameFilter }) => {

  const debounced = useDebounce(handleSetBrandNameFilter, 800);

  const handleBrandNameFilter = brandNameTextFilter => {
    debounced(brandNameTextFilter)
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
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
              onChange={e => handleBrandNameFilter(e.target.value)}
              placeholder="Pesquisar Nome"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
