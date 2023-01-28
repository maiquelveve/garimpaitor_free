import {
  Box,
  Container,
  Typography,
  CircularProgress
} from '@mui/material';

const LoadingSimple = ({ title, titleColor = 'primary', colorLoading = 'primary', ...rest }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          <CircularProgress color={colorLoading} {...rest} />
        </Typography>
        {title &&
          <>
            <br />
            <Typography
              align="center"
              fontSize={12}
              color={titleColor}
            >
              {title}
            </Typography>
          </>
        }
      </Container>
    </Box>
  );
};

export default LoadingSimple;
