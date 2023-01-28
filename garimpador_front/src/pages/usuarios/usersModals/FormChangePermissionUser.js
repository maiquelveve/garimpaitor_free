import { useMediaQuery } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FormPermissionUser({ user, permission, setPermission, ...props }) {

  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'), {
    defaultMatches: true,
    noSsr: false
  });

  const handleRadioChange = (event) => {
    setPermission(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 'auto',
        width: 'fit-content',
        alignItems: 'center'
      }}
    >
      <Typography variant='h5' align='center'>{user.name}</Typography>
      <FormControl sx={{ m: 3 }} variant="standard">
        <Typography id="demo-error-radios2">Permissão:</Typography>
        <RadioGroup
          row={smUp}
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={permission}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="A" control={<Radio />} label="ADMINISTRADOR" />
          <FormControlLabel value="G" control={<Radio />} label="GARIMPADOR" />
          <FormControlLabel value="M" control={<Radio />} label="MERCADO" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
