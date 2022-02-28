import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Personal } from '../../../entidades/personal/personal/personal';
import { PersonalService } from '../../../service/personal/personal/personal.service';
import Swal from 'sweetalert2';
import { AsistenciaPersonalService } from 'src/app/service/personal/asistencia-personal/asistencia-personal.service';
import { AsistenciaPersonal } from 'src/app/entidades/personal/asistencia-personal/asistencia-personal';
import { AlertService } from 'src/app/service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asistencia-personal',
  templateUrl: './asistencia-personal.component.html',
  styleUrls: ['./asistencia-personal.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AsistenciaPersonalComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Utilizamos el array del tipo personal para el select
  listadoPersonal: Personal[];
  // Utilizamos un array del tipo asistencia personal para listar en la tabla
  listadoAsistenciaPersonal: AsistenciaPersonal [];
  //  variable para buscar por personalo
  buscar_personal= "";

  // Variable Botones
  public btnGuardar= false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Personal = false;

// Injeccion de o los servicios a utilizar
  constructor(
    private servicioPersonal: PersonalService,
    private formBuilder: FormBuilder,
    private servicioAsistenciaPersonal : AsistenciaPersonalService,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }

// Formulario reactivo para el registro de datos de la pagina
formularioRegistro = this.formBuilder.group({
  id: [''],
  fecha_asistencia_personal: ['', [Validators.required]],
  estado: ['',[Validators.required]],
  personal: ['',[Validators.required]],
})
  ngOnInit(): void {
    // Ejecutamos los metodos que se ejecutan al cargar la pagina
    this.getPersonal();
    this.getAsistenciasPersonal();
    this.btnEditar = true;
    this.ocultarbusqueda_Personal = true;
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

// Obtener todo el personal para mostrar en la tabla
getPersonal() : void {
  this.servicioPersonal.getPersonal().subscribe(
    (res) => {
      this.listadoPersonal = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
  )
}

// Obtener todas las asistencias del personal
getAsistenciasPersonal() : void {
  this.servicioAsistenciaPersonal.getAsistenciaPersonal().subscribe(
    (res) => {
      this.listadoAsistenciaPersonal = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
// Registrar asistencias personal
registrarAsistenciaPersonal(){
  if (this.formularioRegistro.valid){
    this.servicioAsistenciaPersonal.registrarAsistenciaPersonal(this.formularioRegistro.value).subscribe(
      (res) => {
        this.alertas.alertsuccess();
        this.getAsistenciasPersonal();
        this.cerrarModal();
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  } else {
    this.alertas.alertcampos();
  }
  this.ngOnInit();
}
// Obtener asistencias por id para mostrar en los campos de los imput para su proxima edicion
AsistenciaPersonalId( asistenciapersonal: AsistenciaPersonal, content : any): void{
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
  this.servicioAsistenciaPersonal.getAsistenciaPersonalId(asistenciapersonal).subscribe(
    (res) => {
      this.formularioRegistro.patchValue({
        id: res[0].id,
        fecha_asistencia_personal: res[0].fecha_asistencia_personal,
        estado: res[0].estado,
        personal: res[0].personal,
      });
    },
    (eror) => {
      this.alertas.alerterror();
    }
  );
}
// Editar las asistencias del personal
editarAsistenciaPersonalId(): void {
  // Obtenemos el id para pasarlo por parametro
  const id = this.formularioRegistro.value.id;
  this.servicioAsistenciaPersonal.editarAsistenciaPersonalId(this.formularioRegistro.value,id).subscribe(
    (res)=> {
      console.log(res);
      this.alertas.alertedit();
      this.getAsistenciasPersonal();
      this.cerrarModal();
    },
    (error)=>{
      console.log(error);
      this.alertas.alerterror();
    }
  );

}
// Eliminar asistencias personal
eliminarAsistenciaPersonal(asistenciapersonal: AsistenciaPersonal):void {
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
      this.servicioAsistenciaPersonal.eliminarAsistenciaPersonal(asistenciapersonal).subscribe(
        (res) => {
          console.log(res);
          this.getAsistenciasPersonal();
        },
        (error)=> {
          console.log(error);
        }
      );
      Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
    }

  });
}
// Busqueda de asistencias por personal
busquedaPersonal(): void{
  if (this.buscar_personal == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioAsistenciaPersonal.busquedaPersonal(this.buscar_personal).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Personal = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Personal = false;
        }
        this.listadoAsistenciaPersonal = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}
// Cancelar Busqueda
cancelarbusqueda(): void {
  this.ocultarbusqueda_Personal = true;
  this.getAsistenciasPersonal()
  this.buscar_personal = "";
}
 // Limpiar los campos
cancelar(): void{
  this.formularioRegistro.reset();
  this.btnGuardar = false;
  this.btnEditar = true;
}

}
