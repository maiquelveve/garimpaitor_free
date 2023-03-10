import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from "@mui/material";
import { DialogActionsSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogActionsSimpleModal";
import { DialogContentSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogContentSimpleModal";
import { DialogSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogSimpleModal";
import { DialogTitleSimpleModal } from "src/components/ModalComponents/SimpleModal/DialogTitleSimpleModal";
import { AlertCatch, AlertMessage } from 'src/components/AlertsComponents';
import { MESSAGE_ERROR_ALERT_CATCH } from 'src/config/constant';
import { formatMaskCep, formatMaskCnpj } from 'src/utils/helpersText';
import LoadingSimple from 'src/components/LoadingComponent/LoadingSimple';
import LoadingBasic from 'src/components/LoadingComponent/LoadingBasic';
import FormMarketplace from '../FormMarketplace';

import { useLazyQuery } from '@apollo/client';
import { GET_MARKETPLACES_ID } from 'src/graphql/marketplace/query';

const UpdateMarketplaceModal = ({
  open,
  openAlertError,
  setOpenAlertError,
  configAlert,
  handleClose,
  handleUpdateMarketplace,
  marketplaceId,
  fullWidth = false,
  maxWidth = 'lg',
  ...props
}) => {
  const [marketplace, setMarketplace] = useState({});
  const [loading, setLoading] = useState(true);


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* GET MARKETPLACE ID  ***********/
  const optionsGetMarketplacesId = {
    onCompleted(data) {
      setMarketplace(data.getMarketplaceId);
      setLoading(false);
    },
    onError() {
      AlertCatch(MESSAGE_ERROR_ALERT_CATCH);
    },
    variables: {
      id: marketplaceId
    }
  }
  const [getMarketplaceId] = useLazyQuery(GET_MARKETPLACES_ID, optionsGetMarketplacesId);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/

  useEffect(() => {
    async function fetch() {
      await getMarketplaceId();
    }
    fetch();
  }, [])


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
    validationSchema: Yup.object({
      cnpj: Yup
        .string()
        .max(19, 'CNPJ n??o pode ser maior de 14 d??gitos')
        .min(18, 'CNPJ deve ter no m??mino 14 d??gitos')
        .required('CNPJ ?? obrigat??rio'),
      network: Yup
        .string()
        .required('Rede ?? obrigat??ria'),
      brand: Yup
        .string()
        .required('Marca ?? obrigat??ria'),
      cep: Yup
        .string()
        .max(9, 'CEP n??o pode ser maior de 8 d??gitos')
        .min(9, 'CEP deve ter no m??mino 8 d??gitos')
        .required('CEP ?? obrigat??rio'),
      street: Yup
        .string()
        .max(100, 'Rua n??o pode ser maior de 100 caracteres')
        .min(3, 'Rua deve ter no m??mino 3 caracteres')
        .required('Rua ?? obrigat??ria'),
      number: Yup
        .string()
        .max(50, 'N??mero n??o pode ser maior de 50 caracteres')
        .min(2, 'N??mero deve ter no m??mino 3 caracteres')
        .required('N??mero ?? obrigat??rio'),
      neighborhood: Yup
        .string()
        .max(100, 'Bairro n??o pode ser maior de 100 caracteres')
        .min(3, 'Bairro deve ter no m??mino 3 caracteres')
        .required('Bairro ?? obrigat??rio'),
      complement: Yup
        .string()
        .max(100, 'Complemento n??o pode ser maior de 100 caracteres')
        .min(3, 'Complemento deve ter no m??mino 3 caracteres'),
      state: Yup
        .string()
        .required('Estado ?? obrigat??rio'),
      city: Yup
        .string()
        .required('Cidade ?? obrigat??ria'),

    }),
    onSubmit: async (values) => {
      await handleUpdateMarketplace({ ...values, id: marketplaceId });
    }
  });

  if (!loading) {
    formik.initialValues.cnpj = formatMaskCnpj(marketplace.cnpj)
    formik.initialValues.network = marketplace.brand.network.id
    formik.initialValues.brand = marketplace.brand.id
    formik.initialValues.cep = formatMaskCep(marketplace.cep)
    formik.initialValues.street = marketplace.street
    formik.initialValues.number = marketplace.number
    formik.initialValues.neighborhood = marketplace.neighborhood
    formik.initialValues.complement = marketplace.complement
    formik.initialValues.state = marketplace.city.state.id
    formik.initialValues.city = marketplace.city.id
  }

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
        Editar Mercado
      </DialogTitleSimpleModal>
      <form onSubmit={formik.handleSubmit}>
        {loading ? <LoadingSimple /> :
          <DialogContentSimpleModal>
            {openAlertError &&
              <AlertMessage configAlert={configAlert} open={openAlertError} setOpen={setOpenAlertError} />
            }
            <FormMarketplace formik={formik} />
          </DialogContentSimpleModal>
        }
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

export default UpdateMarketplaceModal;
