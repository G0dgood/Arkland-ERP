import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export const fireAlert = (title: any, html: any, icon: any) => {
  swalWithBootstrapButtons.fire({
    title,
    html,
    icon,
    showCancelButton: false,
    confirmButtonText: "OK",
    cancelButtonText: "OK",
  });
};
