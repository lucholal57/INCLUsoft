import { Component, OnInit } from '@angular/core';
// Importamos librerias necesarias
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Taller } from '../../../entidades/taller/taller/taller';
import { TallerService } from '../../../service/taller/taller/taller.service';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { Alumno } from 'src/app/entidades/alumno/alumno/alumno';
import { Personal } from 'src/app/entidades/personal/personal/personal';
import { AlumnoService } from 'src/app/service/alumno/alumno/alumno.service';
import { PersonalService } from 'src/app/service/personal/personal/personal.service';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css'],
})
export class TallerComponent implements OnInit {
  // Utilizamos el array solo para poder guardar el resultado de la peticion para mostrar en la tabla
  listadoTalleres: Taller[] = [];
  listadoAlumno: Alumno [] = [];
  listadoPersonal: Personal[] = [];



  // Variables Botones
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioTaller: TallerService,
    private formBuilder: FormBuilder,
    private alertas: AlertService,
    private servicioAlumno: AlumnoService,
    private servicioPersonal: PersonalService
  ) {}

  // Formulario reactivo para el registro de datos de la pagina
  formularioRegistro = this.formBuilder.group({
    id: [''],
    nombre_taller: ['', [Validators.required]],
    observaciones: ['', [Validators.required]],
    dias: ['', [Validators.required]],
    horarios: ['', [Validators.required]],
    alumno_id: ['', [Validators.required]],
    personal_id : ['', [Validators.required]]
  });

  ngOnInit(): void {
    // Ejecutamos los dos metodos al iniciar la carga de la pagina web
    this.getTalleres();
    this.btnEditar = true;
    this.getAlumno();
    this.getPersonal();
  }
  //Recibimos alumnos
  getAlumno(): void{
    this.servicioAlumno.getAlumnos().subscribe(
      (res) => {
        this.listadoAlumno = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
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

  getTalleres(): void {
    this.servicioTaller.getTalleres().subscribe(
      (res) => {
        console.log('hola', res);
        this.listadoTalleres = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Registrar Taller
  registrarTaller(): void {
/*
    let auxa = new Array();
    let auxp = new Array();

    for (let x of this.formularioRegistro.value.alumno_id){
          auxa.push(new Object({id: x}));

    }
    for (let y of this.formularioRegistro.value.personal_id){
      auxp.push(new Object({id: y}));

    }

    console.log('datos formulario envio',(auxa));
    console.log('datos formulario envio',(auxp));

    this.formularioRegistro.value.alumno_id = auxa;
    this.formularioRegistro.value.personal_id = auxp
*/
console.log('nuevo formulario',this.formularioRegistro.value)

    if (this.formularioRegistro.valid) {
      this.servicioTaller
        .registrarTaller(this.formularioRegistro.value)
        .subscribe(
          (res) => {
            console.log('resultado obtenido',res);
            this.alertas.alertsuccess();
            this.getTalleres();
            this.formularioRegistro.reset();
          },
          (error) => {
            console.log(error);
            this.alertas.alerterror();
          }
        );
    } else {
      this.alertas.alertcampos();
    }
  }

  // Obtener taller por id para mostrar los campos en los input para su proxima edicion
  TallerId(taller: Taller): void {
    this.servicioTaller.getTallerId(taller).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          nombre_taller: res[0].nombre_taller,
          dias: res[0].dias,
          horarios: res[0].horarios,
          observaciones: res[0].observaciones,
          alumno_id : res[0].alumno_id,
          personal_id : res[0].personal_id
        });
        this.btnEditar = false;
        this.btnRegistrar = true;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }

  // Editar taller ya obtenido por el ID
  editarTallerId(): void {
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioTaller
      .editarTallerId(this.formularioRegistro.value, id)
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getTalleres();
          this.cancelar();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }

  //Elimianr taller enviado por id
  eliminarTaller(taller: Taller): void {
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
        this.servicioTaller.eliminarTaller(taller.id).subscribe((res) => {
          this.getTalleres();
        });
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }
    });
  }
  // Limpiar los campos
  cancelar(): void {
    this.formularioRegistro.reset();
    this.btnEditar = true;
    this.btnRegistrar = false;
  }
}
