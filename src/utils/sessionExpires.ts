import Cookies from "js-cookie";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

// export const sessionExpired = () => {
//   if (Cookies.get("token")) {
//     swalWithBootstrapButtons.fire({
//       title: "Session Expired!",
//       html: "Your session has expired. Please login and try again",
//       icon: "warning",
//       showCancelButton: false,
//       confirmButtonText: "OK",
//       cancelButtonText: "OK",
//     });
//   }
// };

export const sessionExpired = () => {
  return new Promise<void>((resolve) => {
    if (Cookies.get("token")) {
      swalWithBootstrapButtons
        .fire({
          title: "Session Expired!",
          html: "Your session has expired. Please login and try again",
          icon: "warning",
          showCancelButton: false,
          confirmButtonText: "OK",
          cancelButtonText: "OK",
        })
        .then(() => {
          resolve();
        });
    } else {
      resolve();
    }
  });
};

export const updatePassword = () => {
  return new Promise<void>((resolve) => {
    if (Cookies.get("token")) {
      swalWithBootstrapButtons
        .fire({
          title: "Password Update!",
          html: "Your password needs to be updated. Please update your password and try again",
          icon: "warning",
          showCancelButton: false,
          confirmButtonText: "OK",
          cancelButtonText: "OK",
        })
        .then(() => {
          resolve();
        });
    } else {
      resolve();
    }
  });
};
