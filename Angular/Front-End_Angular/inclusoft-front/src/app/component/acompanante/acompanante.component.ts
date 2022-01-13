import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { Acompanante } from '../../entidades/acompanante/acompanante';
import { AcompananteService } from 'src/app/service/acompanante/acompanante.service';

import { Alumno } from '../../entidades/alumno/alumno/alumno';
import { AlumnoService } from 'src/app/service/alumno/alumno/alumno.service';
import { Personal } from '../../entidades/personal/personal/personal';
import { PersonalService } from 'src/app/service/personal/personal/personal.service';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../service/alert/alert.service';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-acompanante',
  templateUrl: './acompanante.component.html',
  styleUrls: ['./acompanante.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AcompananteComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de Alumnos
  listadoAlumnos: Alumno[];
  // Array de Personal
  listadoPersonal: Personal[];
  // Array de acompañantes
  listadoAcompanantes: Acompanante[];
  // VAriable para buscar por personal o alumno
  buscar_personal = "";
  buscar_alumno = "";
   // Variable de Botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusquedaAlumno = false;
  public ocultarbusquedaPersonal = false;

  constructor(
    private servicioAlumno: AlumnoService,
    private servicioPersonal: PersonalService,
    private servicioAcompanante: AcompananteService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id : [''],
    observaciones_acompanante: ['', [Validators.required]],
    alumno: ['',[Validators.required]],
    personal: ['',[Validators.required]],
  })

  ngOnInit(): void {
    this.getAlumno();
    this.getPersonal();
    this.getAcompanante();
    this.btnGuardar = false;
    this.btnEditar = false;
    this.btnCancelar = false;
    this.ocultarbusquedaAlumno = true;
    this.ocultarbusquedaPersonal = true;

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


  // Obtener todo los alumnos para listar
getAlumno(): void{
  this.servicioAlumno.getAlumnos().subscribe(
    (res) => {
      this.listadoAlumnos = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
  // Obtener todo el personal para listar
getPersonal(): void{
  this.servicioPersonal.getPersonal().subscribe(
    (res) => {
      this.listadoPersonal = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
// Obtener todos los acompañantes ya registrados
getAcompanante(): void{
  this.servicioAcompanante.getAcompanante().subscribe(
    (res) => {
      this.listadoAcompanantes = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
  )
}
// Registrar acompañantes
registrarAcompanante(): void{
  if (this.formularioRegistro.valid){
    this.servicioAcompanante.registrarAcompanantes(this.formularioRegistro.value).subscribe(
      (res) => {
        this.alertas.alertsuccess();
        this.formularioRegistro.reset();
        this.getAcompanante();
        this.cerrarModal();

      },
      (error) => {
        this.alertas.alerterror();
      }
    );
    }else {
      this.alertas.alertcampos();
    }
    console.log(this.formularioRegistro.value)
}
// Obtener acompañantes por id para poder mostrar en ventana modal y editar
AcompananteId(acompanante : Acompanante, content: any):void{
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
  this.servicioAcompanante.getAcompananteId(acompanante).subscribe(
    (res) => {
      this.formularioRegistro.patchValue({
        id: res[0].id,
        observaciones_acompanante: res[0].observaciones_acompanante,
        alumno: res[0].alumno,
        personal : res[0].personal,
      });
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
// Editar acompañante
editarAcompananteId(): void{
  // Obtenemos el id para pasarlo por parametros
  const id = this.formularioRegistro.value.id;
  this.servicioAcompanante.editarAcompananteId(this.formularioRegistro.value, id).subscribe(
    (res) => {
      console.log(res)
      this.alertas.alertedit();
      this.getAcompanante();
      this.cerrarModal();

    },
    (error) => {
      console.log(error)
      this.alertas.alerterror();
    }
  )
}
// Eliminar Acompañante
eliminarAcompanante(acompanante: Acompanante ): void{
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

    this.servicioAcompanante.eliminarAcompanante(acompanante).subscribe(
      (res) => {
        console.log(res);
        this.getAcompanante();
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

// Busqueda de acompañantes por alumno
busquedaAlumno(): void{
  if (this.buscar_alumno == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioAcompanante.busquedaAlumno(this.buscar_alumno).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusquedaAlumno = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusquedaAlumno = false;
        }
        this.listadoAcompanantes = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}

// Busqueda de acompañantes por alumno
busquedaPersonal(): void{
  if (this.buscar_personal == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioAcompanante.busquedaPersonal(this.buscar_personal).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusquedaPersonal = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusquedaPersonal = false;
        }
        this.listadoAcompanantes = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }

}

// Funcion para cancelar busqueda por alumno
cancelarbusquedaAlumno(): void {
  this.ocultarbusquedaAlumno = true;
  this.getAcompanante();
  this.buscar_alumno = "";
}
// Funcion para cancelar busqueda por alumno
cancelarbusquedaPersonal(): void {
  this.ocultarbusquedaPersonal = true;
  this.getAcompanante();
  this.buscar_personal = "";
}


// Funcion cancelar solo para borrar los valores de formulario reactivo
cancelar(): void{
  this.formularioRegistro.reset();
}





}


