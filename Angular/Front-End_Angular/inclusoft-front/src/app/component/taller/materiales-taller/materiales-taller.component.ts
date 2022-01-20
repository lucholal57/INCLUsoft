import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { MaterialesTaller } from '../../../entidades/taller/materiales-taller/materiales-taller';
import { MaterialesTallerService } from '../../../service/taller/materiales-taller/materiales-taller.service';

import { Taller } from '../../../entidades/taller/taller/taller';
import { TallerService } from '../../../service/taller/taller/taller.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-materiales-taller',
  templateUrl: './materiales-taller.component.html',
  styleUrls: ['./materiales-taller.component.css']
})
export class MaterialesTallerComponent implements OnInit {
  // Array de materiales de taller
  listadoMaterialesTaller : MaterialesTaller[];
  // Array de talleres para el select
  listadoTalleres : Taller[];
  // Variable de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioTaller : TallerService,
    private servicioMaterialesTaller : MaterialesTallerService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    insumos_disponibles: ['', [Validators.required]],
    taller: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getTalleres();
    this.getMaterialesTaller();
    this.btnEditar = true;
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
// Obtenemos los materiales del taller
getMaterialesTaller(): void {
  this.servicioMaterialesTaller.getMaterialesTaller().subscribe(
    (res) => {
      this.listadoMaterialesTaller = res;
      console.log(res);
    },
    (error) => {
      console.log(error);
      this.alertas.alerterror();
    }
  );
}
// Registrar materiales taller
registrarMaterialesTaller(): void {
  if (this.formularioRegistro.valid){
    this.servicioMaterialesTaller.registrarMaterialesTaller(this.formularioRegistro.value).subscribe(
      (res) => {
        this.alertas.alertsuccess();
        this.formularioRegistro.reset();
        this.getMaterialesTaller();
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  } else {
    this.alertas.alertcampos();
  }
}
// Obtener materiales taller por id para mostrar en el formulario y poder editar
MaterialesTallerId(materiales: MaterialesTaller): void {
this.servicioMaterialesTaller.getMaterialesTallerId(materiales).subscribe(
  (res) => {
    this.formularioRegistro.patchValue({
      id : res[0].id,
      insumos_disponibles: res[0].insumos_disponibles,
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
// Editar Materiales Taller
editarMaterialesTallerId(): void {
  // Obtenemos el id en una constante para pasarlo por parametro
  const id = this.formularioRegistro.value.id;
  this.servicioMaterialesTaller.editarMaterialesTallerId(this.formularioRegistro.value, id).subscribe(
    (res) => {
      console.log(res)
      this.alertas.alertedit();
      this.getMaterialesTaller();
      this.cancelar();
    },
    (error) => {
      console.log(error)
      this.alertas.alerterror();
    }
  );
}
// Eliminar materiales taller
eliminarMaterialesTaller(materiales: MaterialesTaller ): void{
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

    this.servicioMaterialesTaller.eliminarMaterialesTaller(materiales).subscribe(
      (res) => {
        console.log(res);
        this.getMaterialesTaller();
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
