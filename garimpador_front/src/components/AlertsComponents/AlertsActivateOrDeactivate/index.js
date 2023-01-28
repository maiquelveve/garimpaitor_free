import swal from 'sweetalert';
import { AlertCatch } from '../AlertDefaultSystem';
// import './styleAlerts.css'

const AlertsActivateOrDeactivate = (data, callback) => {
  swal({
    title: data.title,
    text: `${data.text} ${data.object}`,
    buttons: {
      cancel: {
        text: data.btnTextCancel,
        value: null,
        visible: true,
        className: "",
        closeModal: true,
      },
      confirm: {
        text: data.btnTextConfirm,
        value: true,
        visible: true,
        className: "",
        closeModal: true
      }
    },
    icon: "warning",
    dangerMode: true,
    className: "",
    closeOnClickOutside: false,
    closeOnEsc: false,

  }).then(async value => {
    if (value) {
      try {
        //Mandar para a API
        swal({
          title: data.titleResult,
          text: data.textResult,
          icon: "success",
          buttons: {
            confirm: {
              text: data.btnTextResult,
              value: true,
              visible: true,
              className: "btnConfirm",
              closeModal: true
            }
          },
        }).then(() => { callback() });
      } catch (error) {
        throw (error)
      }
    }
  }).catch(err => {
    AlertCatch('Ocorreu um erro ao Desativar a Empresa. Tente novamente mais tarde!')
  });
}

export default AlertsActivateOrDeactivate;
