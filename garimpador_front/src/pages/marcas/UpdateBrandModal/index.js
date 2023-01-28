import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Box } from "@mui/material";
import { DialogActionsSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogActionsSimpleModal";
import { DialogContentSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogContentSimpleModal";
import { DialogSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogSimpleModal";
import { DialogTitleSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogTitleSimpleModal";

import { AlertCatch } from 'src/components/AlertsComponents';
import { MESSAGE_ERROR_ALERT_CATCH } from 'src/config/constant';
import FormNetwork from "../FormBrand"
import LoadingBasic from 'src/components/LoadingComponent/LoadingBasic';

import { useQuery } from '@apollo/client';
import { GET_ALL_NETWORKS } from 'src/graphql/networks/query';

const UpdateBrandModal = ({ brand, open, handleClose, handleUpdateBrand, fullWidth = false, maxWidth = 'lg', ...props }) => {
  const [networks, setNetworks] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  const optionGetAllNetworks = {
    onCompleted(data) {
      setNetworks(data.getAllNetworks);
      setLoadingPage(loading);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
    fetchPolicy: 'network-only'

  }
  const { loading } = useQuery(GET_ALL_NETWORKS, optionGetAllNetworks);

  const formik = useFormik({
    initialValues: {
      id: brand.id,
      name: brand.name,
      network: brand.network.id,
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(150, 'Nome não pode ser maior de 150 caracteres')
        .min(3, 'Nome deve ter no mímino 3 caracteres')
        .required('Nome é obrigatório'),
      network: Yup
        .number()
        .required('Rede é obrigatório'),
    }),
    onSubmit: async (values) => {
      await handleUpdateBrand(values);
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
        Editar Marca
      </DialogTitleSimpleModal>
      <form onSubmit={formik.handleSubmit}>
        <DialogContentSimpleModal>
          {loadingPage ?
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...props
              }}
            >
              <LoadingBasic />
            </Box>
            :
            <FormNetwork formik={formik} networks={networks} />
          }
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

export default UpdateBrandModal;
