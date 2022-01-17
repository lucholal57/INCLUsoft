import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { Viaje } from '../../entidades/viaje/viaje';
import { ViajeService } from '../../service/viaje/viaje.service';

import { Alumno } from '../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../service/alumno/alumno/alumno.service';

import { Personal } from '../../entidades/personal/personal/personal';
import { PersonalService } from '../../service/personal/personal/personal.service';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Servicio de busqueda
import { BusquedaService } from 'src/app/service/busqueda/busqueda.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ViajeComponent implements OnInit {
  // Variable P para el conteo del paginado
  p:number = 1;
  // Array de Alumnos
  listadoAlumnos: Alumno[];
  // Array de Personal
  listadoPersonal: Personal[];
  // Array de Viajes
  listadoViaje: Viaje[];
  // Variable para buscar viaje por destino
  buscar_destino = "";
  //Variables de botones para deshabilitar
  public btnGuardar = false
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda = false;

  constructor(
    private servicioAlumno: AlumnoService,
    private servicioPersonal: PersonalService,
    private servicioViaje: ViajeService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
    private buscar : BusquedaService,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    destino: ['', [Validators.required]],
    fecha_viaje: ['', [Validators.required]],
    gastos: ['', [Validators.required]],
    alumno: ['', [Validators.required]],
    personal: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getViajes();
    this.getAlumno();
    this.getPersonal();
    this.btnGuardar = false;
    this.btnEditar = false;
    this.btnCancelar = false;
    this.ocultarbusqueda = true;
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
   // Obtener todo los alumnos para listar
getAlumno(): void{
  this.servicioAlumno.getAlumnos().subscribe(
    (res) => {
      this.listadoAlumnos = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
  // Obtener todo el personal para listar
getPersonal(): void{
  this.servicioPersonal.getPersonal().subscribe(
    (res) => {
      this.listadoPersonal = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
// obtener todos los viajes ya registrados
getViajes(): void{
  this.servicioViaje.getViaje().subscribe(
    (res) => {
      this.listadoViaje = res;
    },
    (error) => {
      this.alertas.alerterror();
    }
  )
}
// Registrar viajes
registrarViaje(): void{
  if (this.formularioRegistro.valid){
    this.servicioViaje.registrarViaje(this.formularioRegistro.value).subscribe(
      (res) => {
        this.alertas.alertsuccess();
        this.getViajes();
        this.cerrarModal();
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }else{
    this.alertas.alertcampos();
  }
}
// Obtener viajes por id para poder mostrar en ventana modal
ViajeId(viaje : Viaje, content : any): void {
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
  this.servicioViaje.getViajeId(viaje).subscribe(
    (res) => {
      this.formularioRegistro.patchValue({
        id : res[0].id,
        destino: res[0].destino,
        fecha_viaje: res[0].fecha_viaje,
        gastos: res[0].gastos,
        alumno: res[0].alumno,
        personal : res[0].personal,
      });
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
// Editar Viaje
editarViajeId(): void{
  this.servicioViaje.editarViajeId(this.formularioRegistro.value, this.formularioRegistro.value.id).subscribe(
    (res) => {
      this.alertas.alertedit();
      this.getViajes();
      this.cerrarModal();
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
// Eliminar Viaje
eliminarViaje(viaje: Viaje ): void{
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

    this.servicioViaje.eliminarViaje(viaje).subscribe(
      (res) => {
        this.getViajes();
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
      Swal.fire('Eliminado!', 'Su eleccion ha sido eliminada.', 'success');
    }

  });
}
// Busqueda de viaje por destino
buscarDestino(): void {
  if (this.buscar_destino == ""){
    this.alertas.alertcampos();
  }else{
    this.buscar.busquedaDestino(this.buscar_destino).subscribe(
      (res) => {
        if (res.length != 0)
        {
          this.alertas.alertLoading();
          this.ocultarbusqueda = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda = false;
        }
        this.listadoViaje = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
}
// Funcion para cancelar busqueda
cancelarBusqueda(): void{
  this.ocultarbusqueda = true;
  this.getViajes();
  this.buscar_destino = "";
}
// Funcion cancelar para borrar los valores del formulario reactivo dentro de la ventana modal
cancelar(): void{
  this.formularioRegistro.reset();
}

}
