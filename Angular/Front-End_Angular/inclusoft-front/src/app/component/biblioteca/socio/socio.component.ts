import { Component, OnInit } from '@angular/core';
//Importamos las clases de entidades necesarias y servicios
import { Socio } from '../../../entidades/biblioteca/socio/socio';
import { SocioService } from 'src/app/service/biblioteca/socio/socio.service';

import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class SocioComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1
  // Array de socios para mostrar en la tabla
  listadoSocio : Socio[];
  // Array de Alumnos para el select
  listadoAlumnos : Alumno[];
  // Variable para buscar socio  por alumno
  buscar_alumno = "";
  // Variables de botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Alumno = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioAlumno: AlumnoService,
    private servicioSocio: SocioService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id:[''],
    fecha_de_inscripcion: ['', [Validators.required]],
    alumno: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getAlumno();
    this.getSocio();
    this.btnEditar = true;
    this.ocultarbusqueda_Alumno = true;
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

  // Obtener todos los alumnos para mostrar la lista de seleccion para registrar un socio
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
// obtenemos todos los socios para mostrar en tabla
getSocio(): void{
  this.servicioSocio.getSocio().subscribe(
    (res) => {
      this.listadoSocio = res;
      console.log(this.listadoSocio)
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
// Registrar Socio
registrarSocio(): void{
  if (this.formularioRegistro.valid){
    this.servicioSocio.registrarSocio(this.formularioRegistro.value).subscribe(
      (res) => {
        this.alertas.alertsuccess();
        this.getSocio();
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
// Obtener socio por id para mostrar en ventana modal para su edicion
SocioId(socio: Socio, content : any): void {
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
  this.servicioSocio.getSocioId(socio).subscribe(
    (res) => {
      this.formularioRegistro.patchValue({
        id: res[0].id,
        fecha_de_inscripcion: res[0].fecha_de_inscripcion,
        alumno: res[0].alumno,
      })
    },
    (error)=> {
      this.alertas.alerterror();
    }
  )
}
//Editar un Socio
editarSocioId(): void{
  this.servicioSocio.editarSocioId(this.formularioRegistro.value, this.formularioRegistro.value.id).subscribe(
    (res) => {
      this.alertas.alertedit();
      this.getSocio();
      this.cerrarModal();
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
//Eliminar Socio
eliminarSocio(socio : Socio): void{
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

    this.servicioSocio.eliminarSocio(socio).subscribe(
      (res) => {
        console.log(res);
        this.getSocio();
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
    this.servicioSocio.busquedaAlumno(this.buscar_alumno).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Alumno = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Alumno = false;
        }
        this.listadoSocio = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}
// Cancelar Busqueda
cancelarbusqueda(): void {
  this.ocultarbusqueda_Alumno = true;
  this.getSocio();
  this.buscar_alumno = "";
}

// Limpiar los campos
cancelar(): void{
  this.formularioRegistro.reset();
  this.btnGuardar = false;
  this.btnEditar = true;
}

}
