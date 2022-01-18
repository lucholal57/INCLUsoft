import { Component, OnInit } from '@angular/core';
// IMPORTAMOS LAS CLASES DE ENTIDADES NECESARIAS Y SERVICIOS
import { Enfermeria } from '../../../entidades/alumno/enfermeria/enfermeria';
import { EnfermeriaService } from '../../../service/alumno/enfermeria/enfermeria.service';

import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enfermeria',
  templateUrl: './enfermeria.component.html',
  styleUrls: ['./enfermeria.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class EnfermeriaComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
// Array de Enfemeria para mostrar en la tabla de
listadoEnfermeria: Enfermeria[];
// Array de alumnos para el select
listadoAlumnos: Alumno[];
//  variable para buscar por alumno
buscar_alumno= "";

// Variable de botones para deshabilitar
public btnGuardar = false;
public btnEditar = false;
public btnCancelar = false;
public ocultarbusqueda_Alumno = false;

// Injeccion de o los servicios a utilizar
  constructor(
    private servicioAlumno: AlumnoService,
    private servicioEnfermeria: EnfermeriaService,
    private formBuilder: FormBuilder,
    private alertas: AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }

// Formulario reactivo para el registro de datos
formularioRegistro = this.formBuilder.group({
  id: [''],
  observaciones: ['',[Validators.required]],
  fecha_observacion: ['',[Validators.required]],
  alumno: ['',[Validators.required]],
})

  ngOnInit(): void {
    this.getAlumnos();
    this.getEnfermeria();
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

  // Obtener todos los alumnos para mostrar la lista de seleccion para Guardar una enfermeria
  getAlumnos(): void{
    this.servicioAlumno.getAlumnos().subscribe(
      (res) => {
        this.listadoAlumnos = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Obtener todas las enfermerias
  getEnfermeria(): void{
    this.servicioEnfermeria.getEnfermeria().subscribe(
      (res) => {
        this.listadoEnfermeria = res;
        console.log(res);
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }

  // Guardar enfermeria
  registrarEnfermeria(): void{
    if (this.formularioRegistro.valid)
    {
    this.servicioEnfermeria.registrarEnfermeria(this.formularioRegistro.value).subscribe(
      (res) => {
        this.alertas.alertsuccess();
        this.getEnfermeria();
        this.cerrarModal();
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
    }else{
      this.alertas.alertcampos();
    }
  }
  // Obtener enfermeria por id para mostrarn en los campos de los input para su procima edicion.
  EnfermeriaId(enfermeria: Enfermeria, content : any): void{
    this.modalService.open(content,{size:'lg'});
    this.btnCancelar = true;
    this.btnEditar = false;
    this.btnGuardar = true;
    this.servicioEnfermeria.getEnfermeriaId(enfermeria).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          observaciones : res[0].observaciones,
          fecha_observacion: res[0].fecha_observacion,
          alumno : res[0].alumno,
        })
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Editar Enfermeria
  editarEnfermeriaId(): void{
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioEnfermeria.editarEnfermeriaId(this.formularioRegistro.value, id).subscribe(
      (res) => {
        console.log(res);
        this.alertas.alertedit();
        this.getEnfermeria();
        this.cerrarModal();
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
  }
  // Eliminar Enfermeria
  eliminarEnfermeria(enfermeria: Enfermeria): void{
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
        this.servicioEnfermeria.eliminarEnfermeria(enfermeria).subscribe(
          (res) => {
            console.log(res);
            this.getEnfermeria();
          },
          (error) => {
            console.log(error);
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
    this.servicioEnfermeria.busquedaAlumno(this.buscar_alumno).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Alumno = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Alumno = false;
        }
        this.listadoEnfermeria = res;
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
  this.getEnfermeria();
  this.buscar_alumno = "";
}
  // Limpiar los campos
  cancelar(): void{
    this.formularioRegistro.reset();
    this.btnGuardar = false;
    this.btnEditar = true;
  }
}
