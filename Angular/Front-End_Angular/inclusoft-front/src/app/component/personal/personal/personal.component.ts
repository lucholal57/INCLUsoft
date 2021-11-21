import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importamos las librerias necesarias de entidades y servicios
import { Personal } from '../../../entidades/personal/personal/personal';
import { PersonalService } from '../../../service/personal/personal/personal.service';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  // Array del tipo Persona para guardar y mostrar en la tabla
  listadoPersonal: Personal[] = [];

  // Variable Botones
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioPersonal: PersonalService,
    private formBuilder: FormBuilder,
    private alertas : AlertService
  ) {}

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    nombre_personal: ['', [Validators.required]],
    apellido_personal: ['', [Validators.required]],
    dni_personal: ['', [Validators.required]],
    telefono_personal: ['', [Validators.required]],
    fecha_nacimiento_personal: ['', [Validators.required]],
    lugar_nacimiento_personal: ['', [Validators.required]],
    profesion: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getPersonal();
    this.btnEditar = true;
  }

  // Obtener todo el personal
  getPersonal(): void {
    this.servicioPersonal.getPersonal().subscribe(
      (res) => {
        console.log(res);
        this.listadoPersonal = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Registrar Personal
  registrarPersonal(): void {
    if (this.formularioRegistro.valid) {
      this.servicioPersonal
        .registrarPersonal(this.formularioRegistro.value)
        .subscribe(
          (res) => {
            this.alertas.alertsuccess();
            this.formularioRegistro.reset();
            this.getPersonal();
          },
          (error) => {
            this.alertas.alerterror();
          }
        );
    } else {
      this.alertas.alertcampos();
    }
  }
  // Obtener alumno por id para mostrar los campos en los input para su proxima edicion.
  PersonalId(personal: Personal): void {
    this.servicioPersonal.getPersonalId(personal).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          nombre_personal: res[0].nombre_personal,
          apellido_personal: res[0].apellido_personal,
          dni_personal: res[0].dni_personal,
          telefono_personal: res[0].telefono_personal,
          fecha_nacimiento_personal: res[0].fecha_nacimiento_personal,
          lugar_nacimiento_personal: res[0].lugar_nacimiento_personal,
          profesion: res[0].profesion,
        });
        this.btnEditar = false;
        this.btnRegistrar = true;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Editar Personal ya obtenido en los input por el ID
  editarPersonalId(): void {
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioPersonal
      .editarPersonal(this.formularioRegistro.value, id)
      .subscribe(
        (res) => {
          this.alertas.alertedit();
          this.getPersonal();
          this.cancelar();
        },
        (error) => {
          this.alertas.alerterror();
        }
      );
  }

  // Eliminar personal enviado por ID
  eliminarPersonal(personal: Personal): void {
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
        this.servicioPersonal.eliminarPersonal(personal).subscribe(
          (res) => {
            this.getPersonal();
          },
          (error) => {
            this.alertas.alerterror();
          }
        );
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
