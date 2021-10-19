import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Personal } from '../../../entidades/personal/personal/personal';
import { PersonalService } from '../../../service/personal/personal/personal.service';
import Swal from 'sweetalert2';
import { AsistenciaPersonalService } from 'src/app/service/personal/asistencia-personal/asistencia-personal.service';
import { AsistenciaPersonal } from 'src/app/entidades/personal/asistencia-personal/asistencia-personal';
import { AlertService } from 'src/app/service/alert/alert.service';

@Component({
  selector: 'app-asistencia-personal',
  templateUrl: './asistencia-personal.component.html',
  styleUrls: ['./asistencia-personal.component.css']
})
export class AsistenciaPersonalComponent implements OnInit {
  // Utilizamos el array del tipo personal para el select 
  listadoPersonal: Personal[];
  // Utilizamos un array del tipo asistencia personal para listar en la tabla
  listadoAsistenciaPersonal: AsistenciaPersonal [];

  // Variable Botones
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

// Injeccion de o los servicios a utilizar
  constructor(
    private servicioPersonal: PersonalService,
    private formBuilder: FormBuilder,
    private servicioAsistenciaPersonal : AsistenciaPersonalService,
    private alertas : AlertService,
  ) { }

// Formulario reactivo para el registro de datos de la pagina
formularioRegistro = this.formBuilder.group({
  id: [''],
  hora_ingreso: ['',[Validators.required]],
  hora_salida: ['',[Validators.required]],
  estado: ['',[Validators.required]],
  personal: ['',[Validators.required]],
})
  ngOnInit(): void {
    // Ejecutamos los metodos que se ejecutan al cargar la pagina
    this.getPersonal();
    this.getAsistenciasPersonal();
    this.btnEditar = true;
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
        this.formularioRegistro.reset();
        this.getAsistenciasPersonal();
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
AsistenciaPersonalId( asistenciapersonal: AsistenciaPersonal): void{
  this.servicioAsistenciaPersonal.getAsistenciaPersonalId(asistenciapersonal).subscribe(
    (res) => {
      this.formularioRegistro.patchValue({
        id: res[0].id,
        hora_ingreso: res[0].hora_ingreso,
        hora_salida: res[0].hora_salida,
        estado: res[0].estado,
        personal: res[0].personal,
      });
      this.btnEditar = false;
      this.btnRegistrar = true;
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
      this.cancelar();
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
 // Linpiar los campos
 cancelar(): void{
  this.formularioRegistro.reset();
  this.btnRegistrar = false;
  this.btnEditar = true;
}

}
