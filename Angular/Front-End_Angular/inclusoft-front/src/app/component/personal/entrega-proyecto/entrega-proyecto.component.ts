import { Component, OnInit } from '@angular/core';
// IMPORTAMOS LAS CLASES DE ENTIDADES NECESARIAS Y SERVICIOS
import { EntregaProyecto } from '../../../entidades/personal/entrega-proyecto/entrega-proyecto';
import { EntregaProyectoService } from 'src/app/service/personal/entrega-proyecto/entrega-proyecto.service';
import { Personal } from '../../../entidades/personal/personal/personal';
import { PersonalService } from '../../../service/personal/personal/personal.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/service/alert/alert.service';

@Component({
  selector: 'app-entrega-proyecto',
  templateUrl: './entrega-proyecto.component.html',
  styleUrls: ['./entrega-proyecto.component.css']
})
export class EntregaProyectoComponent implements OnInit {
  // Array de entrega proyectos para mostrar en la tabla
  listadoEntregaProyecto : EntregaProyecto[];
  // Array de personal para el select
  listadoPersonal : Personal[];

  // Variable de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

// Injeccion de o los servicios a utilizar
  constructor(
    private servicioPersonal : PersonalService,
    private servicioEntregaProyecto : EntregaProyectoService,
    private formBuilder : FormBuilder,
    private alertas : AlertService
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    fecha_entrega: ['',[ Validators.required]],
    area: ['',[Validators.required]],
    observacion: ['',[Validators.required]],
    personal: ['',[Validators.required]],
  })

  ngOnInit(): void {
    this.getPersonal();
    this.getEntregaProyecto();
    this.btnEditar = true;
  }
  //Obtenemos todo el personal para mostrar la lista de seleccion para registrar una entrega proyecto
  getPersonal(): void {
    this.servicioPersonal.getPersonal().subscribe(
      (res) => {
        this.listadoPersonal = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Obtenemos todas las entregas de proyecto
  getEntregaProyecto(): void {
    this.servicioEntregaProyecto.getEntregaProyecto().subscribe(
      (res) => {
        this.listadoEntregaProyecto = res;
        console.log(res);
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Registrar entrega de proyectos
  registrarEntregaProyecto(): void {
    if (this.formularioRegistro.valid) {
      this.servicioEntregaProyecto.registrarEntregaProyecto(this.formularioRegistro.value).subscribe(
        (res) => {
          this.alertas.alertsuccess();
          this.formularioRegistro.reset();
          this.getEntregaProyecto();
        },
        (error) => {
          console.log(error)
          this.alertas.alerterror();
        }
      );
    } else {
      this.alertas.alertcampos();
    }
  }
  // Obtener entregasd de proyectos por id para mostrar en los campos de los input para su proxima edicion
  EntregaProyectoId( entregaproyecto : EntregaProyecto) : void {
    this.servicioEntregaProyecto.getEntregaProyectoId(entregaproyecto).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({ 
          id : res[0].id,
          fecha_entrega : res[0].fecha_entrega,
          area : res[0].area,
          observacion : res[0].observacion,
          personal : res[0].personal,
        });
        this.btnEditar = false;
        this.btnRegistrar = true;
      },
      (error) =>{
        this.alertas.alerterror();
      }
    );
  }
  // Editar las entrega de proyectos
  editarEntregaProyectoId(): void {
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    if (this.formularioRegistro.valid)
    {
      this.servicioEntregaProyecto.editarEntregaProyectoId(this.formularioRegistro.value, id).subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getEntregaProyecto();
          this.cancelar();
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
// Eliminar entrega de proyecto
eliminarEntregaProyecto( entregaproyecto : EntregaProyecto): void {
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
      this.servicioEntregaProyecto.eliminarEntregaProyecto(entregaproyecto).subscribe(
        (res)=> {
          console.log(res);
          this.getEntregaProyecto();
        },
        (error) => {
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
