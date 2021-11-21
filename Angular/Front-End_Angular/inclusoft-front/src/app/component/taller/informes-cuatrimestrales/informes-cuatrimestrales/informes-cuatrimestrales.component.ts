import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { InformesCuatrimestrales } from '../../../../entidades/taller/informes-cuatrimestrales/informes-cuatrimestrales';
import { InformesCuatrimestralesService } from 'src/app/service/taller/informes-cuatrimestrales/informes-cuatrimestrales.service';

import { Taller } from 'src/app/entidades/taller/taller/taller';
import { TallerService } from 'src/app/service/taller/taller/taller.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../../service/alert/alert.service';

@Component({
  selector: 'app-informes-cuatrimestrales',
  templateUrl: './informes-cuatrimestrales.component.html',
  styleUrls: ['./informes-cuatrimestrales.component.css']
})
export class InformesCuatrimestralesComponent implements OnInit {
  // Array de informes cuatrimestrales para mostrar en la tabla
  listadoInformesCuatrimestrales : InformesCuatrimestrales[];
  // Array de talleres para el select
  listadoTalleres: Taller[];
  // Variable de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  constructor(
    private servicioTaller: TallerService,
    private servicioInformesCuatrimestrales: InformesCuatrimestralesService,
    private formBuilder: FormBuilder,
    private alertas: AlertService
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    observaciones_cuatrimestrales: ['', [Validators.required]],
    taller: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getTaller();
    this.getInformesCuatrimestrales();
    this.btnEditar = true;
  }

  // Obtener todos los taller para mostrar la lista de seleccion para registrar un informe cuatrimestral
  getTaller(): void {
    this.servicioTaller.getTalleres().subscribe(
      (res)=> {
        this.listadoTalleres = res;
      },
      (error)=> {
        this.alertas.alerterror();
      }
    );
  }

  // Obtener todos los informes cuatrimestrales
  getInformesCuatrimestrales(): void {
    this.servicioInformesCuatrimestrales.getInformesCuatrimestrales().subscribe(
      (res) => {
        this.listadoInformesCuatrimestrales = res;
        console.log(res);
      },
      (error)=> {
        console.log(error);
        this.alertas.alerterror();
      }
    );
  }

  // Registrar informes cuatrimestrales
  registrarInformesCuatrimestrales(): void {
    if (this.formularioRegistro.valid){
      this.servicioInformesCuatrimestrales.registrarInformesCuatrimestrales(this.formularioRegistro.value).subscribe(
        (res) => {
          this.alertas.alertsuccess();
          this.formularioRegistro.reset();
          this.getInformesCuatrimestrales();
        }
      );
    } else {
      this.alertas.alertcampos();
    }
  }
  // Obtener Informes cuatrimestrales por id para mostrar en los campos de los input en su proxima edicion
  InformesCuatrimestralesId(informe_cuatrimestral: InformesCuatrimestrales): void {
    this.servicioInformesCuatrimestrales.getInformesCuatrimestralesId(informe_cuatrimestral).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          observaciones_cuatrimestrales: res[0].observaciones_cuatrimestrales,
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
  // Editar Informe cuatrimestral
  editarInformesCuatrimestralesId(): void {
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioInformesCuatrimestrales.editarInformesCuatrimestralesId(this.formularioRegistro.value, id).subscribe(
      (res) => {
        console.log(res)
        this.alertas.alertedit();
        this.getInformesCuatrimestrales();
        this.cancelar();
      },
      (error) => {
        console.log(error)
        this.alertas.alerterror();
      }
    );
  }
 // Eliminar Acta Compromiso
eliminarInformesCuatrimestrales(informe_cuatrimestral: InformesCuatrimestrales ): void{
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

    this.servicioInformesCuatrimestrales.eliminarInformesCuatrimestrales(informe_cuatrimestral).subscribe(
      (res) => {
        console.log(res);
        this.getInformesCuatrimestrales();
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
