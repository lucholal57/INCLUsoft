import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { DatosAdicionales } from '../../../entidades/alumno/datos_adicionales/datos-adicionales';
import { DatosAdicionalesService } from '../../../service/alumno/datos_adicionales/datos-adicionales.service';

import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';


@Component({
  selector: 'app-datos-adicionales',
  templateUrl: './datos-adicionales.component.html',
  styleUrls: ['./datos-adicionales.component.css'],
})
export class DatosAdicionalesComponent implements OnInit {
  // Array para el listado de datos adicionales
  listadoDatosAdicionales: DatosAdicionales[];
  // Array para el listado de alumnos
  listadoAlumnos: Alumno[];

  // Variables de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;


  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioDatosAdicionales: DatosAdicionalesService,
    private servicioAlumno: AlumnoService,
    private formBuilder: FormBuilder,
    private alertas: AlertService
  ) {}
  // Formulario reactivo para registrar los datos de la pagina
  formularioRegistro = this.formBuilder.group({
    id: [''],
    jubilacion: ['', [Validators.required]],
    pension: ['', [Validators.required]],
    cobertura_social: ['', [Validators.required]],
    certificado_discapacidad: ['', [Validators.required]],
    vigencia_certificado: ['', [Validators.required]],
    nivel_educacional: ['', [Validators.required]],
    grupo_familiar_convivencia: ['', [Validators.required]],
    actividades_realiza: ['', [Validators.required]],
    trabajo_madre: ['', [Validators.required]],
    trabajo_padre: ['', [Validators.required]],
    telefono_madre: ['', [Validators.required]],
    telefono_padre: ['', [Validators.required]],
    alumno: ['', [Validators.required]],
  });
  
  ngOnInit(): void {
    // Ejecutamos los dos metodos al iniciar la carga de la pagina web
    this.getDatosAdicionales();
    this.getAlumno();
    this.btnEditar = true;

  }
  // Obtener todos los alumnos para mostrar la lista de seleccion para el registro de datos adicionales
  getAlumno(): void {
    this.servicioAlumno.getAlumnos().subscribe(
      (res) => {
        console.log(res);
        this.listadoAlumnos = res;
      },
      (error) => {
       this.alertas.alerterror();
      }
    );
  }
  // Obtener todos los datos adicionales
  getDatosAdicionales(): void {
    this.servicioDatosAdicionales.getDatosAdicionales().subscribe((res) => {
      this.listadoDatosAdicionales = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
    );
  }
  // Registrar datos adicionales
  registrarDatosAdicionales(): void {
    if (this.formularioRegistro.valid){
      this.servicioDatosAdicionales
      .registrarDatosAdicionales(this.formularioRegistro.value)
      .subscribe(
        (res) => {
          this.alertas.alertsuccess();
          this.formularioRegistro.reset();
          this.getDatosAdicionales();
        },
        (error) => {
         this.alertas.alerterror();
        }
      );
    }else {
     this.alertas.alertcampos();
    }
  
  }
  // Obtener datos adicionales por id para mostrar los campos en los input para su proxima edicion
  DatosAdicionalesId(datos_adicionales: DatosAdicionales): void{
    this.servicioDatosAdicionales.getDatosAdicionalesId(datos_adicionales).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          jubilacion: res[0].jubilacion,
          pension: res[0].pension,
          cobertura_social: res[0].cobertura_social,
          certificado_discapacidad: res[0].certificado_discapacidad,
          vigencia_certificado: res[0].vigencia_certificado,
          nivel_educacional: res[0].nivel_educacional,
          grupo_familiar_convivencia: res[0].grupo_familiar_convivencia,
          actividades_realiza: res[0].actividades_realiza,
          trabajo_madre: res[0].trabajo_madre,
          trabajo_padre: res[0].trabajo_padre,
          telefono_madre: res[0].telefono_madre,
          telefono_padre: res[0].telefono_padre,
          alumno: res[0].alumno,
        })
        this.btnEditar = false;
        this.btnRegistrar = true;

      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
  }
  // Editar los datos adicionales
  editarDatosAdicionalesId(): void{
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioDatosAdicionales.editarDatosAdicionales(this.formularioRegistro.value, id).subscribe(
      (res) => {
       this.alertas.alertedit();
        this.getDatosAdicionales();
        this.cancelar();
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Eliminar datos adicionales
  eliminarDatosAdicionales(datos_adicionales: DatosAdicionales): void {
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
        this.servicioDatosAdicionales
        .eliminarDatosAdicionales(datos_adicionales)
        .subscribe(
          (res) => {
            console.log(res);
            this.getDatosAdicionales();
            Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
          },
          (error) => {
            this.alertas.alerterror();
          }
        );
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
