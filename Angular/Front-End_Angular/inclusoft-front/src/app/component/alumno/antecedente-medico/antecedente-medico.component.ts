import { Component, OnInit } from '@angular/core';
// IMPORTAMOS LAS CLASES DE ENTIDADES NECESARIOAS Y SERVICIOS
import { AntecedenteMedico } from '../../../entidades/alumno/antecedente-medico/antecedente-medico';
import { AntecedenteMedicoService } from '../../../service/alumno/antecedente-medico/antecedente-medico.service';
import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-antecedente-medico',
  templateUrl: './antecedente-medico.component.html',
  styleUrls: ['./antecedente-medico.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AntecedenteMedicoComponent implements OnInit {
   // Variable P para el conteo del paginado
  p: number = 1;
  // Array de antecedente-medico para mostrar en la tabla
  listadoAntecedenteMedico: AntecedenteMedico[];
  // Array de alumnos para el select
  listadoAlumnos: Alumno[];
  //  variable para buscar por alumno
  buscar_alumno= "";

  // Variables de Botones para deshabilitar
  public btnGuardar= false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Alumno = false;

  // Injeccion de o los constructores a utilizar
  constructor(
    private servicioAntecedenteMedico: AntecedenteMedicoService,
    private servicioAlumno: AlumnoService,
    private formBuilder: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,
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
            console.log(res);
            this.alertas.alertsuccess();
            this.getAntecedenteMedico();
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
  // Obtener Antecedente Medico por id para mostrar en los campos de los input para su proxima edicion
  AntecedenteMedicoId(antecedente_medico: AntecedenteMedico, content : any): void {
    this.modalService.open(content,{size:'lg'});
    this.btnCancelar = true;
    this.btnEditar = false;
    this.btnGuardar = true;
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
          this.cerrarModal();
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

  // Busqueda de acompañantes por alumno
busquedaAlumno(): void{
  if (this.buscar_alumno == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioAntecedenteMedico.busquedaAlumno(this.buscar_alumno).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Alumno = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Alumno = false;
        }
        this.listadoAntecedenteMedico = res;
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
    this.getAntecedenteMedico();
    this.buscar_alumno = "";
  }
  // Limpiar los campos
  cancelar(): void {
    this.formularioRegistro.reset();
    this.btnGuardar = false;
    this.btnEditar = true;
  }
}
