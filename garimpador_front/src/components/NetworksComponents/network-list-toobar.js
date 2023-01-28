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

export const NetworkListToobar = ({ handleSetNetworkNameFilter }) => {

  const debounced = useDebounce(handleSetNetworkNameFilter, 800);

  const handleNetworkNameFilter = networkNameTextFilter => {
    debounced(networkNameTextFilter)
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
              onChange={e => handleNetworkNameFilter(e.target.value)}
              placeholder="Pesquisar Nome"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
