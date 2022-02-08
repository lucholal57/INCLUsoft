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
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class TallerComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de tallerres
  listadoTalleres: Taller[] = [];
  // Array de alumnos
  listadoAlumno: Alumno [] = [];
  // Array de personal
  listadoPersonal: Personal[] = [];
  //  variable para buscar por personalo
  buscar_taller= "";

  // Variables Botones
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Taller = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioTaller: TallerService,
    private formBuilder: FormBuilder,
    private alertas: AlertService,
    private servicioAlumno: AlumnoService,
    private servicioPersonal: PersonalService,
    config: NgbModalConfig,
    private modalService: NgbModal
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
    this.ocultarbusqueda_Taller = true;
    this.getAlumno();
    this.getPersonal();
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
// Obtenemos todos los talleres
  getTalleres(): void {
    this.servicioTaller.getTalleres().subscribe(
      (res) => {
        this.listadoTalleres = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Registrar Taller
  registrarTaller(): void {
    if (this.formularioRegistro.valid) {
      this.servicioTaller
        .registrarTaller(this.formularioRegistro.value)
        .subscribe(
          (res) => {
            this.alertas.alertsuccess();
            this.getTalleres();
            this.cerrarModal();
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
  TallerId(taller: Taller, content : any): void {
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
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
          this.cerrarModal();
        },
        (error) => {
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
  // Busqueda de de taller por nombre
busquedaTaller(): void{
  if (this.buscar_taller == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioTaller.busquedaTaller(this.buscar_taller).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Taller = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Taller = false;
        }
        this.listadoTalleres = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}
// Cancelar Busqueda
cancelarbusqueda(): void {
  this.ocultarbusqueda_Taller = true;
  this.getTalleres();
  this.buscar_taller = "";
}
 // Limpiar los campos
cancelar(): void{
  this.formularioRegistro.reset();
  this.btnGuardar = false;
  this.btnEditar = true;
}

}
