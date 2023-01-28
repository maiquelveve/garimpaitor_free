import swal from 'sweetalert';

export const AlertCatch = async msg => {
  await swal({
    title: "Ocorreu um erro!",
    text: msg,
    buttons: {
      confirm: {
        text: "OK",
        value: true,
        visible: true,
        className: "",
        closeModal: true
      }
    },
    icon: "error",
    dangerMode: true,
    className: "",
    closeOnClickOutside: false,
    closeOnEsc: false,

  })
}
