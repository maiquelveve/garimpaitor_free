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

export const UserListToobar = ({ setUserNameFilter, ...props }) => {
  const debounced = useDebounce(setUserNameFilter, 800);

  const handleUserNameFilter = userNameTextFilter => {
    debounced(userNameTextFilter);
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
              onChange={e => handleUserNameFilter(e.target.value)}
              placeholder="Pesquisar Nome"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
