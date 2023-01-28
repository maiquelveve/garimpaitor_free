import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ListComponent from './ListMessageComponent';
import Grow from '@mui/material/Grow';

export default function AlertMessage({ open, setOpen, configAlert, timeClosed = 5000 }) {

  const configPropsAlert = {
    color: configAlert.type?.toLowerCase() === "success" ? 'successAlert' : 'errorAlert',
    severity: configAlert.type?.toLowerCase() === "success" ? 'success' : 'error',
  }

  const msg = configMessage(configAlert)

  // CLOSE THE COMPONENT AUTOMATICALLY AFTER A TIME
  setTimeout(() => setOpen(false), timeClosed)

  return (
    <Grow in={open} timeout={850}>
      <Stack
        sx={{ width: '100%' }}
        spacing={2}
      >
        <Alert
          variant="filled"
          {...configPropsAlert}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{configAlert.type?.toLowerCase() === "success" ? 'SUCESSO' : 'ERRO'}</AlertTitle>
          <ListComponent msgArray={msg} />
        </Alert>
      </Stack>
    </Grow>
  );
}

function configMessage(configAlert) {
  if (configAlert.error) {
    const { graphQLErrors, networkError } = configAlert.error;

    if (networkError) {
      return [process.env.NEXT_PUBLIC_MESSAGE_ERROR_500]
    }

    return graphQLErrors.map(objError => objError.extensions.exception.description_pt);
  }

  if (configAlert.textMsgArray) {
    return configAlert.textMsgArray;
  }

  return [configAlert.textMsg];
}
