import { Component, OnInit } from '@angular/core';
// IMPORTAMOS LAS CLASES DE ENTIDADES NECESARIOS Y SERVICIOS
import { Patologia } from '../../../entidades/alumno/patologia/patologia';
import { PatologiaService } from '../../../service/alumno/patologia/patologia.service';

import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import  { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-patologia',
  templateUrl: './patologia.component.html',
  styleUrls: ['./patologia.component.css']
})
export class PatologiaComponent implements OnInit {
  // Array de patologias para mostrar en la tabla
  listadoPatologias: Patologia[];
  // Array de alumnos para el select
  listadoAlumnos: Alumno[];

  // Variables de botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioAlumno: AlumnoService,
    private servicioPatologia: PatologiaService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
  ) { }

  //Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [ ''],
    nombre_patologia: ['',[Validators.required]],
    medicacion: ['',[Validators.required]],
    observacion: ['',[Validators.required]],
    alumno: ['',[Validators.required]],
  })

  ngOnInit(): void {
    // Ejecutamos los metodos al inicar la carga de la pagina
    this.getAlumno();
    this.getPatologias();
    this.btnEditar = true;
  }

  // Obtener todos los alunmnos para mostrar la lista de seleccion para registrar una patologia
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
  // Obtener todas las patologias
  getPatologias(): void{
    this.servicioPatologia.getPatologias().subscribe(
      (res) => {
        this.listadoPatologias = res;
        console.log(res);
        },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Registrar Patologias
  registrarPatologia(): void{
    if(this.formularioRegistro.valid) {
      this.servicioPatologia.registrarPatologia(this.formularioRegistro.value).subscribe(
        (res) => {
          console.log('patologias',this.formularioRegistro.value)
          this.alertas.alertsuccess();
          console.log(res);
          this.formularioRegistro.reset();
          this.getPatologias();
        },
        (error) => {
         this.alertas.alerterror();
        }
      );
    } else {
      this.alertas.alertcampos();
    }

  }
  // Obtener patologias por id para mostrar en los campos de los input para su proxima edicion.
  PatologiaId(patologia: Patologia): void{
    this.servicioPatologia.getPatologiasId(patologia).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          nombre_patologia: res[0].nombre_patologia,
          medicacion: res[0].medicacion,
          observacion: res[0].observacion,
          alumno: res[0].alumno,
        })
        this.btnEditar = false;
        this.btnRegistrar = true;

      },
      (error) => {
        this.alertas.alerterror();
      }

    );
  }
  // Editar las patologias
  editarPatologiaId(): void{
    //Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioPatologia.editarPtologiasId(this.formularioRegistro.value , id).subscribe(
      (res) => {
        console.log(res);
        this.alertas.alertedit();
        this.getPatologias();
        this.cancelar();
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
  }
  // Eliminar Patologia
  eliminarPatologia(patologia: Patologia): void{
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
        this.servicioPatologia.eliminarPatologia(patologia).subscribe(
          (res) => {
            console.log(res);
            this.getPatologias();
          },
          (error) => {
            console.log(error);
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
