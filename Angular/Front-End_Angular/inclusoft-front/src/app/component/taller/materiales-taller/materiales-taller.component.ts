import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { MaterialesTaller } from '../../../entidades/taller/materiales-taller/materiales-taller';
import { MaterialesTallerService } from '../../../service/taller/materiales-taller/materiales-taller.service';

import { Taller } from '../../../entidades/taller/taller/taller';
import { TallerService } from '../../../service/taller/taller/taller.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-materiales-taller',
  templateUrl: './materiales-taller.component.html',
  styleUrls: ['./materiales-taller.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class MaterialesTallerComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de materiales de taller
  listadoMaterialesTaller : MaterialesTaller[];
  // Array de talleres para el select
  listadoTalleres : Taller[];
   //  variable para buscar por personalo
  buscar_taller= "";
  // Variable de Botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Taller = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioTaller : TallerService,
    private servicioMaterialesTaller : MaterialesTallerService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
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
    this.ocultarbusqueda_Taller = true;
  }
  // Open funcion para abrir ventana modal
  open(content:any) {
    this.modalService.open(content,{size:'lg'});
    this.btnEditar = true;
    this.btnGuardar = false;
    this.btnCancelar = false;
  }
  // Funcion para cerrar ventana modal
  cerrarModal(): void{
    this.modalService.dismissAll();
    this.formularioRegistro.reset();
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
        this.getMaterialesTaller();
        this.cerrarModal();
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
MaterialesTallerId(materiales: MaterialesTaller, content : any): void {
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
this.servicioMaterialesTaller.getMaterialesTallerId(materiales).subscribe(
  (res) => {
    this.formularioRegistro.patchValue({
      id : res[0].id,
      insumos_disponibles: res[0].insumos_disponibles,
      taller: res[0].taller,
    });
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
      this.cerrarModal();
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
 // Busqueda de de taller por nombre
 busquedaTaller(): void{
  if (this.buscar_taller == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioMaterialesTaller.busquedaTaller(this.buscar_taller).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Taller = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Taller = false;
        }
        this.listadoMaterialesTaller = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}
// Cancelar Busqueda
cancelarbusqueda(): void {
  this.ocultarbusqueda_Taller = true;
  this.getMaterialesTaller();
  this.buscar_taller = "";
}

// Limpiar los campos
cancelar(): void{
  this.formularioRegistro.reset();
  this.btnGuardar = false;
  this.btnEditar = true;
}

}
