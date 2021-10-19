import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { PermisoSalida } from 'src/app/entidades/personal/permiso-salida/permiso-salida';
import { PermisoSalidaService } from 'src/app/service/personal/permiso-salida/permiso-salida.service';
import { Personal } from 'src/app/entidades/personal/personal/personal';
import { PersonalService } from '../.././../service/personal/personal/personal.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';


@Component({
  selector: 'app-permiso-salida',
  templateUrl: './permiso-salida.component.html',
  styleUrls: ['./permiso-salida.component.css']
})
export class PermisoSalidaComponent implements OnInit {
  // Array de permiso salidas para mostrar en tabla
  listadoPermisoSalida: PermisoSalida[];
  // Array de personal para el select
  listadoPersonal: Personal[];

  // Variablde de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  constructor(
    private servicioPersonal : PersonalService,
    private servicioPermisoSalida: PermisoSalidaService,
    private formBuilder : FormBuilder,
    private alertas : AlertService
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
          this.formularioRegistro.reset();
          this.getPermisosSalida();
        },
        (error) => {
          console.log("errorrrr" + error);
          this.alertas.alerterror();
        }
      );
    }else{
      this.alertas.alertcampos();
    }
  }
  // Obtener permisos de salida por id para mostrar en los campos de los input para su proxima edicion
  PermisoSalidaId( permisosalida : PermisoSalida): void {
    this.servicioPermisoSalida.getPermisoSalidaId( permisosalida ).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id : res[0].id,
          fecha_permiso : res[0].fecha_permiso,
          motivo : res[0].motivo,
          horario_salida : res[0].horario_salida,
          horario_regreso : res[0].horario_regreso,
          personal : res[0].personal,
        });
        this.btnEditar = false;
        this.btnRegistrar = true;
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
        this.cancelar();
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

    // Linpiar los campos
    cancelar(): void{
      this.formularioRegistro.reset();
      this.btnRegistrar = false;
      this.btnEditar = true;
    }
  
}
