import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

export const DialogSimpleModal = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
