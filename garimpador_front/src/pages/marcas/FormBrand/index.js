import { Grid, TextField, Box, MenuItem } from '@mui/material';

export default function FormBrand({ formik, networks, ...props }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...props
      }}
    >
        <Grid container spacing={3} >
          <Grid item xs={12} >
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
          <Grid item xs={12} >
            <TextField
              error={Boolean(formik.touched.network && formik.errors.network)}
              select
              fullWidth
              helperText={formik.touched.network && formik.errors.network}
              label="Rede"
              margin="normal"
              name="network"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.network}
              variant="outlined"
            >
              {networks.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
    </Box>
  );
}
