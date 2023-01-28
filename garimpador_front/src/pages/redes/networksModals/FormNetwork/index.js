import { Grid, TextField, Box } from '@mui/material';

export default function FormNetwork({ formik, ...props }) {

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
        </Grid>
    </Box>
  );
}
