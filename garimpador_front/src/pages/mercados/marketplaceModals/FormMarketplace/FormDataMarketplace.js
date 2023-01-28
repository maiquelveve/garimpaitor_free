import { Grid, TextField, Box } from '@mui/material';
import { formatMaskCnpj } from 'src/utils/helpersText';

export default function FormDataMarketplace({ formik, ...props }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 'auto',
        width: 'fit-content',
        alignItems: 'center',
        ...props
      }}
    >
      <Grid container spacing={3} >
        <Grid item xs={12} >
          <TextField
            error={Boolean(formik.touched.cnpj && formik.errors.cnpj)}
            helperText={formik.touched.cnpj && formik.errors.cnpj}
            label="CNPJ"
            margin="normal"
            name="cnpj"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formatMaskCnpj(formik.values.cnpj)}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
