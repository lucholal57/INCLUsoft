import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { Prestamo } from '../../../entidades/biblioteca/prestamo/prestamo';
import { PrestamoService } from 'src/app/service/biblioteca/prestamo/prestamo.service';
import { Socio } from '../../../entidades/biblioteca/socio/socio';
import { SocioService } from 'src/app/service/biblioteca/socio/socio.service';
import { Libro } from '../../../entidades/biblioteca/libro/libro';
import { LibroService } from 'src/app/service/biblioteca/libro/libro.service';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import *as moment from 'moment';


@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class PrestamoComponent implements OnInit {
    // Variable P para el conteo del paginado
    p: number = 1
    // Array de prestamos para mostrar en la tabla
    listadoPrestamo : Prestamo[];
    // Array de Libros  para el select
    listadoLibro : Libro[];
    // Array de socios para el select
    listadoSocio : Socio[];
    //Objeto prestamo
    prestamo : Prestamo[];
    //objeto libro
    objeto_libro : Libro
    // Variable para buscar socio  por alumno
    buscar_socio = "";
    //VAriable para obtener la fecha de hoy
    hoy = moment().format('YYYY-MM-DD');
    //VAriables para deshabilitar las fechas cuando haga un resgisto y una devolucion
    registrofecha : boolean
    devolucionfecha: boolean
    // Variables de botones para deshabilitar
    public btnGuardar = false;
    public btnEditar = false;
    public btnCancelar = false;
    public ocultarbusqueda_Socio = false;

    //Injectamos en el constructor los servicios a utilizar
  constructor(
    private servicioPrestamo : PrestamoService,
    private servicioSocio : SocioService,
    private servicioLibro : LibroService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    libro: ['', [Validators.required]],
    socio: ['', [Validators.required]],
    fecha_de_prestamo: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    fecha_de_devolucion: []
  })

  ngOnInit(): void {
    this.getSocio();
    this.getLibro();
    this.getPrestamo();
    this.btnEditar = true;
    this.ocultarbusqueda_Socio = true;
    this.registrofecha = false;
    this.devolucionfecha = false;
  }
    // Open funcion para abrir ventana modal
    open(content:any) {
      this.modalService.open(content,{size:'lg'});
      this.btnEditar = true;
      this.btnGuardar = false;
      this.btnCancelar = false;
      this.registrofecha = true;
      this.devolucionfecha = false;
    }
    // Funcion para cerrar ventana modal
    cerrarModal(): void{
      this.modalService.dismissAll();
      this.formularioRegistro.reset();
    }
    // obtenemos todos los socios para mostrar en tabla
getSocio(): void{
  this.servicioSocio.getSocio().subscribe(
    (res) => {
      this.listadoSocio = res;
      console.log(this.listadoSocio)
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
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
//Obtener todos los prestamos
getPrestamo(): void{
  this.servicioPrestamo.getPrestamo().subscribe(
    (res) => {
      console.log(res);
      this.listadoPrestamo = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
  )
}

// Registrar Prestamo
registrarPrestamo(): void{
  var libroobjeto : Libro[];
  var idlibro = this.formularioRegistro.value.libro
  this.servicioLibro.getLibroPrestado(this.formularioRegistro.value.libro).subscribe(
    (res) => {
        libroobjeto = res;
        libroobjeto.forEach(a => {
          if(a.estado == 'Libre')
          {
            this.formularioRegistro.controls['estado'].setValue("Activo")
            this.servicioPrestamo.registrarPrestamo(this.formularioRegistro.value).subscribe(
              (res) => {
                this.alertas.alertsuccess();
                this.getPrestamo();
                this.cerrarModal();
                this.listadoLibro.forEach(a => {
                  if(a.id == idlibro)
                  {
                    a.estado = "Prestado"
                    this.servicioLibro.editarLibroId(a, a.id).subscribe(
                      (res) => {
                        console.log(res)
                      },
                      (error) => {
                        console.log(error)
                      }
                    )
                  }
                })
              },
              (error) => {
                this.alertas.alerterror();
              }
            );
          }
          else{
            this.alertas.alertLibroPrestado();
          }
        })

    },
    (error) => {
        console.log(error);
    }
  )


}
//Obtener prestamo por id para mostrar en ventana modal para su edicion
PrestamoId(prestamo: Prestamo, content : any): void {
  this.modalService.open(content,{size:'lg'});
  this.registrofecha = false;
  this.devolucionfecha = true;
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
  this.servicioPrestamo.getPrestamoId(prestamo).subscribe(
    (res) => {
      this.formularioRegistro.patchValue({
        id: res[0].id,
        libro: res[0].libro,
        socio: res[0].socio,
        fecha_de_prestamo: res[0].fecha_de_prestamo,
        estado: res[0].estado,
        fecha_de_devolucion: this.hoy
      })
    },
    (error)=> {
      this.alertas.alerterror();
    }
  )
}
//Editar Prestamo
editarPrestamoId(): void {
  var libroobjeto :Libro[]
  this.servicioPrestamo.editarPrestamoId(this.formularioRegistro.value, this.formularioRegistro.value.id).subscribe(
    (res) => {
      console.log("Esto es lo que contiene el formulario",this.formularioRegistro.value.libro)
      this.servicioLibro.getLibroPrestado(this.formularioRegistro.value.libro).subscribe(
        (res) => {
          libroobjeto = res
          console.log("resultado del libro que encontro por id",libroobjeto)
          libroobjeto.forEach(a => {
            a.estado="Libre"
            this.servicioLibro.editarLibroId(a, a.id).subscribe(
              (res) =>{
                console.log(res)
              }
            )
          })
        }
      )
      this.alertas.alertedit();
      this.getPrestamo();
      this.cerrarModal();
    },
    (error) => {
      this.alertas.alerterror();
    }
  )
}
//Eliminar Prestamo
eliminarPrestamo(prestamo : Prestamo): void {
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

    this.servicioPrestamo.eliminarPrestamo(prestamo).subscribe(
      (res) => {
        console.log(res);
        this.getPrestamo();
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
// Busqueda prestamo por socios
busquedaSocio(): void{
  if (this.buscar_socio == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioPrestamo.busquedaSocio(this.buscar_socio).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Socio = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Socio = false;
        }
        this.listadoPrestamo = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
}
// Cancelar Busqueda
cancelarbusqueda(): void {
  this.ocultarbusqueda_Socio = true;
  this.getPrestamo();
  this.buscar_socio = "";
}

// Limpiar los campos
cancelar(): void{
  this.formularioRegistro.reset();
  this.btnGuardar = false;
  this.btnEditar = true;
}



}
