import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export const fireAlert = ( title: string, message: string, icon: any) => { 
  swalWithBootstrapButtons.fire({
    title: title  ,
    html: message,
    icon:icon,
    showCancelButton: false,
    confirmButtonText: "OK",
    cancelButtonText: "OK",
  });
};

export const fireAlert2 = ( title: string, message: string, icon: any ,url:any) => { 
  swalWithBootstrapButtons.fire({
    title: title  ,
    html: message,
    icon:icon,
    showCancelButton: false, 
    cancelButtonText: "OK",
     confirmButtonText: "Okay"
    }).then(function () {
      // Redirect the user
       window.location.replace(url); 
    });
   
};
