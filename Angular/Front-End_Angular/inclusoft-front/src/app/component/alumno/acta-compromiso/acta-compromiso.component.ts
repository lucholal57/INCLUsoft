import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { ActaCompromiso } from '../../../entidades/alumno/acta-compromiso/acta-compromiso';
import { ActaCompromisoService } from '../../../service/alumno/acta-compromiso/acta-compromiso.service';

import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-acta-compromiso',
  templateUrl: './acta-compromiso.component.html',
  styleUrls: ['./acta-compromiso.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ActaCompromisoComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de actas compromiso para mostrar en la tabla
  listadoActaCompromiso: ActaCompromiso[];
  // Array de alumnos para el select
  listadoAlumnos: Alumno[];
  //  variable para buscar por alumno
  buscar_alumno= "";
    // Variable de Botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Alumno = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioAlumno: AlumnoService,
    private servicioActaCompromiso: ActaCompromisoService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
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
        this.getActaCompromiso();
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
// Obtener Acta Compromiso por id para mostrar en los campos de los input en su proxima edicion
ActaCompromisoId(acta_compromiso: ActaCompromiso, content : any): void{
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
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
      this.cerrarModal();
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

// Busqueda de acompañantes por alumno
busquedaAlumno(): void{
  if (this.buscar_alumno == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioActaCompromiso.busquedaAlumno(this.buscar_alumno).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Alumno = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Alumno = false;
        }
        this.listadoActaCompromiso = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}

cancelarbusqueda(): void {
  this.ocultarbusqueda_Alumno = true;
  this.getActaCompromiso();
  this.buscar_alumno = "";
}

// Limpiar los campos
cancelar(): void{
  this.formularioRegistro.reset();
  this.btnGuardar = false;
  this.btnEditar = true;
}




}

