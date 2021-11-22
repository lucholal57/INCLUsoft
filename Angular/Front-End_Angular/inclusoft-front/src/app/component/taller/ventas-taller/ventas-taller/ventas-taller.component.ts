import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { VentasTaller } from '../../../../entidades/taller/ventas-taller/ventas-taller';
import { VentasTallerService } from '../../../../service/taller/ventas-taller/ventas-taller.service';

import { Taller } from '../../../../entidades/taller/taller/taller';
import { TallerService } from '../../../../service/taller/taller/taller.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../../service/alert/alert.service';

@Component({
  selector: 'app-ventas-taller',
  templateUrl: './ventas-taller.component.html',
  styleUrls: ['./ventas-taller.component.css']
})
export class VentasTallerComponent implements OnInit {
  // Array de ventas taller
  listadoVentasTaller : VentasTaller[];
  // Array de talleres para el select
  listadoTalleres : Taller[];
  // Variable de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioTaller : TallerService,
    private servicioVentasTaller : VentasTallerService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    ganancia: ['', [Validators.required]],
    observacion_ventas: ['', [Validators.required]],
    taller: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getTalleres();
  }

   // Obtenmemos los talleres para mostrar en la lista de seleccion al registrar un material
   getTalleres(): void {
    this.servicioTaller.getTalleres().subscribe(
      (res) => {
        this.listadoTalleres = res;
      },
      (error) => {
        this.alertas.alerterror();
  }
  );
}
// Obtenemos las ventas de los talleres
getVentasTaller(): void {
  this.servicioVentasTaller.getVentasTaller().subscribe(
    (res) => {
      this.listadoVentasTaller = res;
      console.log(res);
    },
    (error) => {
      console.log(error);
      this.alertas.alerterror();
    }
  );
}
// Registrar ventas de taller
registrarVentasTaller(): void {
  if (this.formularioRegistro.valid){
    this.servicioVentasTaller.registrarVentasTaller(this.formularioRegistro.value).subscribe(
      (res) => {
        this.alertas.alertsuccess();
        this.formularioRegistro.reset();
        this.getVentasTaller();
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  } else {
    this.alertas.alertcampos();
  }
}
// Obtenemos ventas de taller por id para mostrar en el formulario para su edicion
VentasTallerId(ventas: VentasTaller): void {
  this.servicioVentasTaller.getVentasTallerId(ventas).subscribe(
    (res) => {
      this.formularioRegistro.patchValue({
        id : res[0].id,
        ganancia: res[0].ganancia,
        observacion_ventas: res[0].observacion_ventas,
        taller: res[0].taller,
      });
      this.btnEditar = false;
      this.btnRegistrar = true;
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
// Editar ventas de taller
editarVentasTallerId(): void {
  // Obtenemos el id en una constante para pasarlo por parametro
  const id = this.formularioRegistro.value.id;
  this.servicioVentasTaller.editarVentasTallerId(this.formularioRegistro.value, id).subscribe(
    (res) => {
      console.log(res);
      this.alertas.alertedit();
      this.getVentasTaller();
      this.cancelar();
    },
    (error) => {
      console.log(error);
      this.alertas.alerterror();
    }
  );
}
// Eliminar ventas de taller
eliminarVentasTaller(ventas: VentasTaller ): void{
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

    this.servicioVentasTaller.eliminarVentasTaller(ventas).subscribe(
      (res) => {
        console.log(res);
        this.getVentasTaller();
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
      Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
    }

  });
}
// Limpiar los campos
cancelar(): void{
  this.formularioRegistro.reset();
  this.btnRegistrar = false;
  this.btnEditar = true;
}

}
