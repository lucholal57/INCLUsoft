import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { ActaCompromiso } from '../../../entidades/alumno/acta-compromiso/acta-compromiso';
import { ActaCompromisoService } from '../../../service/alumno/acta-compromiso/acta-compromiso.service';

import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-acta-compromiso',
  templateUrl: './acta-compromiso.component.html',
  styleUrls: ['./acta-compromiso.component.css']
})
export class ActaCompromisoComponent implements OnInit {
  // Array de actas compromiso para mostrar en la tabla
  listadoActaCompromiso: ActaCompromiso[];
  // Array de alumnos para el select
  listadoAlumnos: Alumno[];
  // Variable de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioAlumno: AlumnoService,
    private servicioActaCompromiso: ActaCompromisoService,
    private formBuilder: FormBuilder,
    private alertas : AlertService
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    dias: ['', [Validators.required]],
    ingreso: ['', [Validators.required]],
    salida: ['', [Validators.required]],
    traslado: ['', [Validators.required]],
    personas_autorizadas_retiro: ['', [Validators.required]],
    dni_persona_autorizada: ['', [Validators.required]],
    alumno: ['', [Validators.required]],

  })
  ngOnInit(): void {
    // Ejecutamnos los metodos al iniciar la carga de la pagina
    this.getAlumno();
    this.getActaCompromiso();
    this.btnEditar = true;
  }

  // Obtener todos los alumnos para mostrar la lista de seleccion para registrar un acta compromiso
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
// Obtener todas las actas compromiso
getActaCompromiso(): void{
  this.servicioActaCompromiso.getActaCompromiso().subscribe(
    (res) => {
      this.listadoActaCompromiso = res;
      console.log(res);
    },
    (error) => {
      console.log(error);
      this.alertas.alerterror();
    }
  );
}
// Registrar Acta Compromiso
registrarActaCompromiso(): void{
  if(this.formularioRegistro.valid) {
    this.servicioActaCompromiso.registrarActaCompromiso(this.formularioRegistro.value).subscribe(
      (res) => {
        this.alertas.alertsuccess();
        this.formularioRegistro.reset();
        this.getActaCompromiso();
      },
      (error) => {
      this.alertas.alerterror();
      }
    );
  } else {
    this.alertas.alertcampos();
  }
}
// Obtener Acta Compromiso por id para mostrar en los campos de los input en su proxima edicion
ActaCompromisoId(acta_compromiso: ActaCompromiso): void{
  this.servicioActaCompromiso.getActaCompromisoId(acta_compromiso). subscribe(
    (res) => {
      this.formularioRegistro.patchValue({
        id: res[0].id,
        dias: res[0].dias,
        ingreso: res[0].ingreso,
        salida: res[0].salida,
        traslado: res[0].traslado,
        personas_autorizadas_retiro: res[0].personas_autorizadas_retiro,
        dni_persona_autorizada: res[0].dni_persona_autorizada,
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
// Editar Acta Compromiso
editarActaCompromisoId(): void{
  // Obtenemos el id para pasarlo por parametro
  const id = this.formularioRegistro.value.id;
  this.servicioActaCompromiso.editarActaCompromisoId(this.formularioRegistro.value, id).subscribe(
    (res) => {
      console.log(res);
      this.alertas.alertedit();
      this.getActaCompromiso();
      this.cancelar();
    },
    (error) => {
      console.log(error);
      this.alertas.alerterror();
    }
  );
}
// Eliminar Acta Compromiso
eliminarActaCompromiso(acta_compromiso: ActaCompromiso ): void{
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
      
    this.servicioActaCompromiso.eliminarActaCompromiso(acta_compromiso).subscribe(
      (res) => {
        console.log(res);
        this.getActaCompromiso();
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
