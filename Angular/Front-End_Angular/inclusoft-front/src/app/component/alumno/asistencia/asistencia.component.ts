import { Component, OnInit } from '@angular/core';
// IMPORTAMOS LAS CLASES DE ENTIDADES NECESARIAS Y SERVICIOS
import { Asistencia } from '../../../entidades/alumno/asistencia/asistencia';
import { AsistenciaService } from '../../../service/alumno/asistencia/asistencia.service';

import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  // Array de asistencias para mostrar en la tabla
  listadoAsistencias: Asistencia[];
  // Array de alumnos para el select
  listadoAlumnos: Alumno[];

  // Variable de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioAlumno: AlumnoService,
    private servicioAsistencia: AsistenciaService,
    private formBuilder: FormBuilder,
    private alertas:  AlertService
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    fecha_asistencia: ['', [Validators.required]],
    estado_asistencia: ['', [Validators.required]],
    alumno: ['', [Validators.required]],
  })

  ngOnInit(): void {
    // Ejecutamos los metodos al iniciar la carga de la pagina
    this.getAsistencia();
    this.getAlumno();
    this.btnEditar = true;
  }
  // Obtener todos los alumnos para mostrar la lista de seleccion para registrar una asistencia
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
  // Obtener todas las asistencias
  getAsistencia(): void{
    this.servicioAsistencia.getAsistencias().subscribe(
      (res) => {
        this.listadoAsistencias = res;
        console.log(res);
      },
      (error) => {
        this.alertas.alerterror();
     }
    );
  }
  // Registrar asistencias
  registrarAsistencia(): void{
    if (this.formularioRegistro.valid){
      this.servicioAsistencia.registrarAsistencias(this.formularioRegistro.value).subscribe(
        (res) => {
         this.alertas.alertsuccess();
          this.formularioRegistro.reset();
          this.getAsistencia();
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
  // Obtener asistencias por id para mostrar en los campos de los input para su proxima edicion.
  AsistenciaId(asistencia: Asistencia): void{
    this.servicioAsistencia.getAsistenciasId(asistencia).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          fecha_asistencia: res[0].fecha_asistencia,
          estado_asistencia: res[0].estado_asistencia,
          alumno: res[0].alumno,
        });
        this.btnEditar = false;
        this.btnRegistrar = true;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Editar las asistencias
  editarAsistenciaId(): void{
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioAsistencia.editarAsistenciasId(this.formularioRegistro.value, id).subscribe(
      (res) => {
        console.log(res);
        this.alertas.alertedit();
        this.getAsistencia();
        this.cancelar();
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
  }
  // Eliminar Asistencias
  eliminarAsistencia(asistencia: Asistencia): void {
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
         this.servicioAsistencia.eliminarAsistencia(asistencia).subscribe(
        (res) => {
          console.log(res);
          this.getAsistencia();
        },
        (error) => {
          console.log(error);
        }
      );
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }
      
    });
     
  
    }
  // Linpiar los campos
  cancelar(): void{
    this.formularioRegistro.reset();
    this.btnRegistrar = false;
    this.btnEditar = true;
  }

}
