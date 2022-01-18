import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importamos las librerias necesarias de entidades y servicios
import { Personal } from '../../../entidades/personal/personal/personal';
import { PersonalService } from '../../../service/personal/personal/personal.service';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class PersonalComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array del tipo Persona para guardar y mostrar en la tabla
  listadoPersonal: Personal[] = [];
  //  variable para buscar por alumno
  buscar_personal= "";

  // Variable Botones
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Personal = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioPersonal: PersonalService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
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
    this.ocultarbusqueda_Personal = true;
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
            this.getPersonal();
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
  // Obtener alumno por id para mostrar los campos en los input para su proxima edicion.
  PersonalId(personal: Personal, content : any): void {
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
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
          this.cerrarModal();
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
  // Busqueda de acompañantes por alumno
busquedaPersonal(): void{
  if (this.buscar_personal== ""){
    this.alertas.alertcampos();
  }else{
    this.servicioPersonal.busquedaPersonal(this.buscar_personal).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Personal = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Personal = false;
        }
        this.listadoPersonal = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}
// Cancelar Busqueda
cancelarbusqueda(): void {
  this.ocultarbusqueda_Personal = true;
  this.getPersonal();
  this.buscar_personal = "";
}
  // Limpiar los campos
  cancelar(): void {
    this.formularioRegistro.reset();
    this.btnEditar = true;
    this.btnGuardar = false;
  }
}
