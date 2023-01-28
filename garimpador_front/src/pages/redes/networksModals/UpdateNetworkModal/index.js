import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from "@mui/material";
import { DialogActionsSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogActionsSimpleModal";
import { DialogContentSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogContentSimpleModal";
import { DialogSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogSimpleModal";
import { DialogTitleSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogTitleSimpleModal";
import FormNetwork from "../FormNetwork"
import LoadingBasic from 'src/components/LoadingComponent/LoadingBasic';

const UpdateNetworkModal = ({ network, open, handleClose, handleUpdateNetWork, fullWidth = false, maxWidth = 'lg', ...props }) => {
  const formik = useFormik({
    initialValues: {
      id: network.id,
      name: network.name,
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(150, 'Nome não pode ser maior de 150 caracteres')
        .min(3, 'Nome deve ter no mímino 3 caracteres')
        .required('Nome é obrigatório'),
    }),
    onSubmit: async (values) => {
      await handleUpdateNetWork(values);
      handleClose();
    }
  });

  return (
    <DialogSimpleModal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      {...props}
    >
      <DialogTitleSimpleModal id="customized-dialog-title" onClose={handleClose}>
        Editar Rede
      </DialogTitleSimpleModal>
      <form onSubmit={formik.handleSubmit}>
        <DialogContentSimpleModal>
          <FormNetwork formik={formik} />
        </DialogContentSimpleModal>
        <DialogActionsSimpleModal>
          {formik.isSubmitting ? <LoadingBasic /> :
            <>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                type="submit"
              >
                SALVAR
              </Button>
              <Button onClick={handleClose}>
                FECHAR
              </Button>
            </>
          }
        </DialogActionsSimpleModal>
      </form>
    </DialogSimpleModal>
  )
}

export default UpdateNetworkModal;
