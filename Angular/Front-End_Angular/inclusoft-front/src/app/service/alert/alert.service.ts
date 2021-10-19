import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  resultado: any;
  constructor() {}

  // Alert de OK
  alertsuccess() {
    Swal.fire('Excelente', 'Se registro correctamente', 'success');
  }

  // Alerta Edicion OK
  alertedit() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Edicion Exitosa!!',
      showConfirmButton: false,
      timer: 1700,
    });
  }
  // Alert error
  alerterror() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Falla de Conexion!',
    });
  }
  // Alert campos requeridos
  alertcampos() {
    Swal.fire('Existen campos obligatorios sin rellenar');
  }
  
  /* Alert eliminar el

    Swal.fire({
      title: 'Esta seguro de eliminar??',
      text: 'No podra revertir el cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }
      
    });
  */
}
