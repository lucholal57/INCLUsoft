import { Component, OnInit } from '@angular/core';
// Impotamos las clases de entidades necesarias y servicios
import { ProduccionTaller } from 'src/app/entidades/taller/produccion-taller/produccion-taller';
import { ProduccionTallerService } from 'src/app/service/taller/produccion-taller/produccion-taller.service';

import { Taller } from '../../../entidades/taller/taller/taller';
import { TallerService } from '../../../service/taller/taller/taller.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
@Component({
  selector: 'app-produccion-taller',
  templateUrl: './produccion-taller.component.html',
  styleUrls: ['./produccion-taller.component.css'],
})
export class ProduccionTallerComponent implements OnInit {
  // Array de produccion de taller
  listadoProduccionTaller: ProduccionTaller[];
  // Array de talleres para el select
  listadoTalleres: Taller[];
  // Variable de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioTaller: TallerService,
    private servicioProduccionTaller: ProduccionTallerService,
    private formBuilder: FormBuilder,
    private alertas: AlertService
  ) {}

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    nombre_produccion: ['', [Validators.required]],
    fecha_produccion: ['', [Validators.required]],
    materiales: ['', [Validators.required]],
    costo_venta: ['', [Validators.required]],
    taller: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getTalleres();
    this.getProduccionTaller();
    this.btnEditar = true;
  }

  // Obtenmemos los talleres para mostrar en la lista de seleccion al registrar una produccion
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
  // Obtenemos las producciones de taller
  getProduccionTaller(): void {
    this.servicioProduccionTaller.getProduccionTaller().subscribe(
      (res) => {
        this.listadoProduccionTaller = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
  }
  // Registrar produccion de taller
  registrarProduccionTaller(): void {
    console.log('produccion taller valores', this.formularioRegistro.value)
    if (this.formularioRegistro.valid){
      this.servicioProduccionTaller.registrarProduccionTaller(this.formularioRegistro.value).subscribe(
        (res) => {
          this.alertas.alertsuccess();
          this.formularioRegistro.reset();
          this.getProduccionTaller();
        },
        (error) => {
          this.alertas.alerterror();
        }
      );
    } else {
      this.alertas.alertcampos();
    }
  }
  // Obtener produccion de taller por id para mostrar en el formulario y poder editar
  ProduccionTallerId(produccion : ProduccionTaller): void {
    this.servicioProduccionTaller.getProduccionTallerId(produccion).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id : res[0].id,
          nombre_produccion: res[0].nombre_produccion,
          fecha_produccion: res[0].fecha_produccion,
          materiales: res[0].materiales,
          costo_venta: res[0].costo_venta,
          taller: res[0].taller,
        });
        this.btnEditar = false;
        this.btnRegistrar = true;
      },
      (error) => { this.alertas.alerterror()}
    );
  }
  // Editar Produccion de taller
  editarProduccionTallerId(): void {
    // Obtenemos el id en una costante para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioProduccionTaller.editarProduccionTallerId(this.formularioRegistro.value, id).subscribe(
      (res) => {
        console.log(res);
        this.alertas.alertedit();
        this.getProduccionTaller();
        this.cancelar();
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    )
  }
// Eliminar produccion taller
eliminarProduccionTaller(produccion: ProduccionTaller ): void{
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

    this.servicioProduccionTaller.eliminarProduccionTaller(produccion).subscribe(
      (res) => {
        console.log(res);
        this.getProduccionTaller();
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
