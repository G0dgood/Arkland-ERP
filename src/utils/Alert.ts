import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export const fireAlert = (  message: string, icon: any) => { 
  swalWithBootstrapButtons.fire({
    title: icon === "success" ? "Success" : "Error",
    html: message,
    icon,
    showCancelButton: false,
    confirmButtonText: "OK",
    cancelButtonText: "OK",
  });
};
