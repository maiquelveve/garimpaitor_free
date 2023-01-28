import {
  CircularProgress
} from '@mui/material';

const LoadingBasic = ({ colorLoading = 'primary', ...rest }) => {
  return (
    <CircularProgress color={colorLoading} {...rest} />
  );
};

export default LoadingBasic;
