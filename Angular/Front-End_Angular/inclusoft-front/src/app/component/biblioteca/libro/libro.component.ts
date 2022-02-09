import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { Libro } from '../../../entidades/biblioteca/libro/libro';
import { LibroService } from '../../../service/biblioteca/libro/libro.service';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class LibroComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1
  // Array de socios para mostrar en la tabla
  listadoLibro : Libro[];
  //Varialbe para buscar libro por nombre
  buscar_libro = "";
    // Variables de botones para deshabilitar
    public btnGuardar = false;
    public btnEditar = false;
    public btnCancelar = false;
    public ocultarbusqueda_Libro = false;

    // Injeccion de o los servicios a utilizar
  constructor(
    private servicioLibro : LibroService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id:[''],
    titulo: ['', [Validators.required]],
    edades: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getLibro();
    this.btnEditar = true;
    this.ocultarbusqueda_Libro = true;
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

  // Obtenemos todos los libros para mostrar en la tabla
  getLibro(): void{
    this.servicioLibro.getLibro().subscribe(
      (res) => {
        this.listadoLibro = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Registrar Libro
  registrarLibro(): void{
    if (this.formularioRegistro.valid){
      this.servicioLibro.registrarLibro(this.formularioRegistro.value).subscribe(
        (res) => {
          this.alertas.alertsuccess();
          this.getLibro();
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
  // Obtener libro por id para mostrar en ventana modal para su edicion
  LibroId(libro : Libro, content : any): void {
    this.modalService.open(content,{size:'lg'});
    this.btnCancelar = true;
    this.btnEditar = false;
    this.btnGuardar = true;
    this.servicioLibro.getLibroId(libro).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          titulo: res[0].titulo,
          edades: res[0].edades,
          estado: res[0].estado,
        })
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
  //Editar un Libro
  editarLibroId(): void {
    this.servicioLibro.editarLibroId(this.formularioRegistro.value, this.formularioRegistro.value.id).subscribe(
      (res) => {
        this.alertas.alertedit();
        this.getLibro();
        this.cerrarModal();
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
  //Eliminar Libro
  eliminarLibro(libro : Libro): void {
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

      this.servicioLibro.eliminarLibro(libro).subscribe(
        (res) => {
          console.log(res);
          this.getLibro();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }
    });
  }
  //Busqueda Libro
  busquedaLibro(): void {
    if (this.buscar_libro == ""){
      this.alertas.alertcampos();
    } else {
      this.servicioLibro.busquedaLibro(this.buscar_libro).subscribe(
        (res) => {
          if (res.length != 0){
            this.alertas.alertLoading();
            this.ocultarbusqueda_Libro = false;
          } else {
            this.alertas.alertLoadingError();
            this.ocultarbusqueda_Libro = false;
          }
          this.listadoLibro = res;
        },
        (error) => {
          this.alertas.alerterror();
        }
      )
    }
  }
  //Cancelar busquedaLibro
  cancelarbusqueda(): void {
    this.ocultarbusqueda_Libro = true;
    this.getLibro();
    this.buscar_libro = "";
  }
  // Limpiar los campos
cancelar(): void{
  this.formularioRegistro.reset();
  this.btnGuardar = false;
  this.btnEditar = true;
}

}
