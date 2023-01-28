import { useState } from 'react';
import { Button } from '@mui/material';
import { DialogSimpleModal } from 'src/components/ModalComponents/SimpleModal/DialogSimpleModal';
import { DialogTitleSimpleModal } from 'src/components/ModalComponents/SimpleModal/DialogTitleSimpleModal';
import { DialogContentSimpleModal } from 'src/components/ModalComponents/SimpleModal/DialogContentSimpleModal';
import { DialogActionsSimpleModal } from 'src/components/ModalComponents/SimpleModal/DialogActionsSimpleModal';

import FormPermissionUser from './FormChangePermissionUser';

const ChangePermissionUserModal = ({ user, open, setOpen, handleSaveChangePermissionUser, fullWidth = false, maxWidth = 'lg' }) => {
  const [permission, setPermission] = useState(user.type === "A" ? 'A' : user.type === "M" ? 'M' : 'G');

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DialogSimpleModal
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitleSimpleModal id="customized-dialog-title" onClose={handleClose}>
          TROCAR PERMISSÃO
        </DialogTitleSimpleModal>
        <DialogContentSimpleModal dividers>
          <FormPermissionUser user={user} permission={permission} setPermission={setPermission} />
        </DialogContentSimpleModal>
        <DialogActionsSimpleModal>
          <Button autoFocus onClick={() => handleSaveChangePermissionUser(user, permission)}>
            SALVAR
          </Button>
        </DialogActionsSimpleModal>
      </DialogSimpleModal>
    </div>
  );
}

export default ChangePermissionUserModal;
