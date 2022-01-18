import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { PermisoSalida } from 'src/app/entidades/personal/permiso-salida/permiso-salida';
import { PermisoSalidaService } from 'src/app/service/personal/permiso-salida/permiso-salida.service';
import { Personal } from 'src/app/entidades/personal/personal/personal';
import { PersonalService } from '../.././../service/personal/personal/personal.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-permiso-salida',
  templateUrl: './permiso-salida.component.html',
  styleUrls: ['./permiso-salida.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class PermisoSalidaComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de permiso salidas para mostrar en tabla
  listadoPermisoSalida: PermisoSalida[];
  // Array de personal para el select
  listadoPersonal: Personal[];
  //  variable para buscar por personalo
  buscar_personal= "";

  // Variablde de Botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Personal = false;

  constructor(
    private servicioPersonal : PersonalService,
    private servicioPermisoSalida: PermisoSalidaService,
    private formBuilder : FormBuilder,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }

  // Formulario reactivo pargistro de datos
formularioRegistro = this.formBuilder.group({
  id : [''],
  fecha_permiso : ['',[Validators.required]],
  motivo : ['',[Validators.required]],
  horario_salida : ['',[Validators.required]],
  horario_regreso : ['',[Validators.required]],
  personal : ['',[Validators.required]],
});

  ngOnInit(): void {
    this.getPermisosSalida();
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

  //Obtener todos los personales para mostrar en la lista de seleccion para registrar un persmiso de salida
  getPersonal(): void {
    this.servicioPersonal.getPersonal().subscribe(
      (res)=> {
        this.listadoPersonal = res;
      },
      (error)=>{
        this.alertas.alerterror();
      }
    );
  }
  // Obtener todos los permisos de salida
  getPermisosSalida(): void {
    this.servicioPermisoSalida.getPermisoSalida().subscribe(
      (res)=> {
        this.listadoPermisoSalida = res;
      },
      (error)=> {
        this.alertas.alerterror();
      }
    )
  }
  // Registrar permisos de salida
  registrarPermisoSalida(): void {
    if(this.formularioRegistro.valid)
    {
      this.servicioPermisoSalida.registrarPermisoSalida(this.formularioRegistro.value).subscribe(
        (res)=> {
          this.alertas.alertsuccess();
          this.getPermisosSalida();
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
  // Obtener permisos de salida por id para mostrar en los campos de los input para su proxima edicion
  PermisoSalidaId( permisosalida : PermisoSalida, content : any): void {
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
    this.servicioPermisoSalida.getPermisoSalidaId( permisosalida ).subscribe(
      (res) => {
        console.log('resultado verificacion modal', res)
        this.formularioRegistro.patchValue({
          id : res[0].id,
          fecha_permiso : res[0].fecha_permiso,
          motivo : res[0].motivo,
          horario_salida : res[0].horario_salida,
          horario_regreso : res[0].horario_regreso,
          personal : res[0].personal,
        });
      },
      (error)=> {
        this.alertas.alerterror();
      }
    );
  }
  // Editar permisos de salida
  editarPermisoSalidaId(): void {
    //Obtenemos el id para pasarlo por parametros
    const id = this.formularioRegistro.value.id;
    this.servicioPermisoSalida.editarPermisoSalidaId(this.formularioRegistro.value , id).subscribe(
      (res)=> {
        this.alertas.alertedit();
        this.getPermisosSalida();
        this.cerrarModal();
      },
      (error)=> {
        this.alertas.alerterror();
      }
    );
  }
  //Eliminar permisos de salida
  eliminarPermisoSalida( permisosalida : PermisoSalida): void {
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
        this.servicioPermisoSalida.eliminarPermisoSalida( permisosalida).subscribe(
        (res) => {
          console.log(res);
          this.getPermisosSalida();
        },
        (error)=> {
          console.log(error);
        }
        );
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }

    });
  }
  // Busqueda de permisos salida por personal
busquedaPersonal(): void{
  if (this.buscar_personal == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioPermisoSalida.busquedaPersonal(this.buscar_personal).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Personal = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Personal = false;
        }
        this.listadoPermisoSalida = res;
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
  this.getPermisosSalida();
  this.buscar_personal = "";
}

// Linpiar los campos
cancelar(): void{
    this.formularioRegistro.reset();
    this.btnGuardar = false;
    this.btnEditar = true;
  }

}
