import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from "@mui/material";
import { DialogActionsSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogActionsSimpleModal";
import { DialogContentSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogContentSimpleModal";
import { DialogSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogSimpleModal";
import { DialogTitleSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogTitleSimpleModal";
import { AlertMessage } from 'src/components/AlertsComponents';
import LoadingBasic from 'src/components/LoadingComponent/LoadingBasic';
import FormMarketplace from '../FormMarketplace';

const CreateMarketplaceModal = ({ open, openAlertError, setOpenAlertError, configAlert, handleClose, handleCreateMarketplace, fullWidth = false, maxWidth = 'lg', ...props }) => {

  const formik = useFormik({
    initialValues: {
      cnpj: '',
      network: '',
      brand: '',
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
      state: '',
      city: '',
    },
    initialErrors: {
      blockButton: true,
    },
    validationSchema: Yup.object({
      cnpj: Yup
        .string()
        .max(19, 'CNPJ não pode ser maior de 14 dígitos')
        .min(18, 'CNPJ deve ter no mímino 14 dígitos')
        .required('CNPJ é obrigatório'),
      network: Yup
        .string()
        .required('Rede é obrigatória'),
      brand: Yup
        .string()
        .required('Marca é obrigatória'),
      cep: Yup
        .string()
        .max(9, 'CEP não pode ser maior de 8 dígitos')
        .min(9, 'CEP deve ter no mímino 8 dígitos')
        .required('CEP é obrigatório'),
      street: Yup
        .string()
        .max(100, 'Rua não pode ser maior de 100 caracteres')
        .min(3, 'Rua deve ter no mímino 3 caracteres')
        .required('Rua é obrigatória'),
      number: Yup
        .string()
        .max(50, 'Número não pode ser maior de 50 caracteres')
        .min(2, 'Número deve ter no mímino 3 caracteres')
        .required('Número é obrigatório'),
      neighborhood: Yup
        .string()
        .max(100, 'Bairro não pode ser maior de 100 caracteres')
        .min(3, 'Bairro deve ter no mímino 3 caracteres')
        .required('Bairro é obrigatório'),
      complement: Yup
        .string()
        .max(100, 'Complemento não pode ser maior de 100 caracteres')
        .min(3, 'Complemento deve ter no mímino 3 caracteres'),
      state: Yup
        .string()
        .required('Estado é obrigatório'),
      city: Yup
        .string()
        .required('Cidade é obrigatória'),

    }),
    onSubmit: async (values) => {
      await handleCreateMarketplace(values);
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
        Criar Mercado
      </DialogTitleSimpleModal>
      <form onSubmit={formik.handleSubmit}>
        <DialogContentSimpleModal>
          {openAlertError &&
            <AlertMessage configAlert={configAlert} open={openAlertError} setOpen={setOpenAlertError} />
          }
          <FormMarketplace formik={formik} />
        </DialogContentSimpleModal>
        <DialogActionsSimpleModal>
          {formik.isSubmitting ? <LoadingBasic /> :
            <>
              <Button
                color="primary"
                disabled={!!Object.keys(formik.errors).length}
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

export default CreateMarketplaceModal;
