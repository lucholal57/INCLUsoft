import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Alumno } from '../../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../../service/alumno/alumno/alumno.service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AlumnoComponent implements OnInit {
  p: number = 1;
  // Utilizamos el array solo para poder guardar y mostrar en la tabla
  listadoAlumnos: Alumno[] = [];
  //VAriable para la busqueda por alumno
  buscar_alumno ="";

  // Variables Botones
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusquedaAlumno = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioAlumno: AlumnoService,
    private formBuilder: FormBuilder,
    private alertas: AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  // Formulario reactivo para el registro de datos de la pagina.
  formularioRegistro = this.formBuilder.group({
    id: [''],
    nombre_alumno: ['', [Validators.required]],
    apellido_alumno: ['', [Validators.required]],
    dni_alumno: ['', [Validators.required]],
    telefono_alumno: ['', [Validators.required]],
    fecha_nacimiento_alumno: ['', [Validators.required]],
    lugar_nacimiento_alumno: ['', [Validators.required]],
    direccion_alumno: ['', [Validators.required]],
  });

  ngOnInit(): void {
    // Ejecutamos los dos metodos al iniciar la carga de la pagina web
    this.getAlumnos();
    this.btnGuardar = false;
    this.btnEditar = false;
    this.btnCancelar = false;
    this.ocultarbusquedaAlumno = true;
  }

  // Open funcion para abrir ventana modal
  open(content:any) {
    this.modalService.open(content,{size:'lg'});
    this.btnEditar = true;
    this.btnGuardar = false;
    this.btnCancelar = false;
    this.ocultarbusquedaAlumno = true;
  }
  // Funcion para cerrar ventana modal
  cerrarModal(): void{
    this.modalService.dismissAll();
    this.formularioRegistro.reset();
  }
  // Obtener todos los Alumnos
  getAlumnos(): void {
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
  // Guardar alumno
  registrarAlumno(): void {
    if (this.formularioRegistro.valid) {
      this.servicioAlumno
        .registrarAlumno(this.formularioRegistro.value)
        .subscribe(
          (res) => {
            this.alertas.alertsuccess();
            this.getAlumnos();
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
  // Obtener alumno por id para mostrar los campos en los input para su proxima edicion
  AlumnoId(alumno: Alumno, content : any): void {
    this.modalService.open(content,{size:'lg'});
    this.btnCancelar = true;
    this.btnEditar = false;
    this.btnGuardar = true;
    this.servicioAlumno.getAlumnoId(alumno).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          nombre_alumno: res[0].nombre_alumno,
          apellido_alumno: res[0].apellido_alumno,
          dni_alumno: res[0].dni_alumno,
          telefono_alumno: res[0].telefono_alumno,
          fecha_nacimiento_alumno: res[0].fecha_nacimiento_alumno,
          lugar_nacimiento_alumno: res[0].lugar_nacimiento_alumno,
          direccion_alumno: res[0].direccion_alumno,
        });
        this.btnEditar = false;
        this.btnGuardar = true;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Editar alumno ya obtenido por el ID
  editarAlumnoId(): void {
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioAlumno
      .editarAlumno(this.formularioRegistro.value, id)
      .subscribe(
        (res) => {
          console.log(res)
          this.alertas.alertedit();
          this.getAlumnos();
          this.cerrarModal();
        },
        (error) => {
          console.log(error)
          this.alertas.alerterror();
        }
      );
  }
  // Eliminar alumno enviado por id
  eliminarAlumno(alumno: Alumno): void {

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
          this.servicioAlumno.eliminarAlumno(alumno.id).subscribe(
            (res) => {
            this.getAlumnos();
      });
          Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
        }

      });
  }


// Busqueda de acompañantes por alumno
busquedaAlumno(): void{
  if (this.buscar_alumno == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioAlumno.busquedaAlumno(this.buscar_alumno).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusquedaAlumno = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusquedaAlumno = false;
        }
        this.listadoAlumnos = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}

// Funcion para cancelar busqueda por alumno
cancelarbusquedaAlumno(): void {
  this.ocultarbusquedaAlumno = true;
  this.getAlumnos();
  this.buscar_alumno = "";
}

 // Funcion cancelar solo para borrar los valores de formulario reactivo
cancelar(): void{
  this.formularioRegistro.reset();
}

}
