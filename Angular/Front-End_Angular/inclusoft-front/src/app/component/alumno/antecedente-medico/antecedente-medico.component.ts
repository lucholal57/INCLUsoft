import { Component, OnInit } from '@angular/core';
// IMPORTAMOS LAS CLASES DE ENTIDADES NECESARIOAS Y SERVICIOS
import { AntecedenteMedico } from '../../../entidades/alumno/antecedente-medico/antecedente-medico';
import { AntecedenteMedicoService } from '../../../service/alumno/antecedente-medico/antecedente-medico.service';
import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/service/alert/alert.service';

@Component({
  selector: 'app-antecedente-medico',
  templateUrl: './antecedente-medico.component.html',
  styleUrls: ['./antecedente-medico.component.css'],
})
export class AntecedenteMedicoComponent implements OnInit {
  // Array de antecedente-medico para mostrar en la tabla
  listadoAntecedenteMedico: AntecedenteMedico[];
  // Array de alumnos para el select
  listadoAlumnos: Alumno[];

  // Variables de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los constructores a utilizar
  constructor(
    private servicioAntecedenteMedico: AntecedenteMedicoService,
    private servicioAlumno: AlumnoService,
    private formBuilder: FormBuilder,
    private alertas: AlertService
  ) {}

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    grupo_sanguineo: ['', [Validators.required]],
    factor_rh: ['', [Validators.required]],
    alumno: ['', [Validators.required]],
  });

  ngOnInit(): void {
    // Ejecutamos los metodos al iniciar la carga de la pagina
    this.getAlumno();
    this.getAntecedenteMedico();
    this.btnEditar = true;
  }
  // Obtener todos los alumnos
  getAlumno(): void {
    this.servicioAlumno.getAlumnos().subscribe(
      (res) => {
        console.log(res)
        this.listadoAlumnos = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Obtener todos los antecedentes medicos
  getAntecedenteMedico(): void {
    this.servicioAntecedenteMedico.getAntecedenteMedico().subscribe(
      (res) => {
        this.listadoAntecedenteMedico = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Registrar Antecedente Medicos
  registrarAntecedenteMedico(): void {
    if (this.formularioRegistro.valid) {
      this.servicioAntecedenteMedico
        .registrarAntecedenteMedico(this.formularioRegistro.value)
        .subscribe(
          (res) => {
            this.alertas.alertsuccess();
            this.formularioRegistro.reset();
            this.getAntecedenteMedico();
          },
          (error) => {
            this.alertas.alerterror();
          }
        );
    } else {
      this.alertas.alertcampos();
    }
  }
  // Obtener Antecedente Medico por id para mostrar en los campos de los input para su proxima edicion
  AntecedenteMedicoId(antecedente_medico: AntecedenteMedico): void {
    this.servicioAntecedenteMedico
      .getAntecedenteMedicoId(antecedente_medico)
      .subscribe(
        (res) => {
          this.formularioRegistro.patchValue({
            id: res[0].id,
            grupo_sanguineo: res[0].grupo_sanguineo,
            factor_rh: res[0].factor_rh,
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
  // Editar Antecedente Medicos
  editarAntecedenteMedicoId(): void {
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioAntecedenteMedico
      .editarAntecedenteMedicoId(this.formularioRegistro.value, id)
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getAntecedenteMedico();
          this.cancelar();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }
  // Eliminar Antecedente Medico
  eliminarAntecedenteMedico(antecedente_medico: AntecedenteMedico): void {
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
        this.servicioAntecedenteMedico
        .elimnarAntecedenteMedico(antecedente_medico)
        .subscribe(
          (res) => {
            console.log(res);
            this.getAntecedenteMedico();
          },
          (error) => {
            console.log(error);
            alert('Error al eliminar Antecedente Medico');
          }
        );
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }
      
    });
  }
  // Limpiar los campos
  cancelar(): void {
    this.formularioRegistro.reset();
    this.btnRegistrar = false;
    this.btnEditar = true;
  }
}
