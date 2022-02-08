import { Component, OnInit } from '@angular/core';
 // Importamos las clases de entidades necesarias y servicios
import { InventarioTaller } from '../../../entidades/taller/inventario-taller/inventario-taller';
import { InventarioTallerService } from '../../../service/taller/inventario-taller/inventario-taller.service';

import { Taller } from '../../../entidades/taller/taller/taller';
import { TallerService } from '../../../service/taller/taller/taller.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventario-taller',
  templateUrl: './inventario-taller.component.html',
  styleUrls: ['./inventario-taller.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class InventarioTallerComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de inventarios por taller
  listadoInventarioTaller : InventarioTaller[];
  // Array de talleres para el select
  listadoTalleres : Taller[];
  // variable para buscar por personalo
  buscar_taller= "";
  // Variable de Botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Taller = false;

  constructor(
    private servicioTaller : TallerService,
    private servicioInventarioTaller : InventarioTallerService,
    private formBuilder: FormBuilder,
    private alertas : AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    materiales_fin_ciclo: ['', [Validators.required]],
    taller: ['', [Validators.required]],
  })

  ngOnInit(): void {
  this.getInventarioTaller();
    this.getTalleres();
    this.btnEditar = true;
    this.ocultarbusqueda_Taller = true;
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

  // Obtenmemos los talleres para mostrar en la lista de seleccion al registrar un material
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
// Obtenemos los inventarios de taller
getInventarioTaller(): void {
  this.servicioInventarioTaller.getInventarioTaller().subscribe(
    (res) => {
      this.listadoInventarioTaller = res;
      console.log(res);
    },
    (error) => {
      console.log(error)
      this.alertas.alerterror();
    }
  );
}
// REgistramos inventario de taller
registrarInventarioTaller(): void {
  if (this.formularioRegistro.valid){
    this.servicioInventarioTaller.registrarInventarioTaller(this.formularioRegistro.value).subscribe(
      (res) => {
        this.alertas.alertsuccess();
        this.getInventarioTaller();
        this.cerrarModal();
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  } else {
    this.alertas.alertcampos();
  }
}
// Obtener inventario de taller por ID para mostrar en el formulario y porder editarlo
InventarioTallerId(inventario: InventarioTaller, content : any): void {
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
  this.servicioInventarioTaller.getInventarioTallerId(inventario).subscribe(
    (res) => {
      this.formularioRegistro.patchValue({
        id : res[0].id,
        materiales_fin_ciclo: res[0].materiales_fin_ciclo,
        taller: res[0].taller,
      });
    },
    (error) => {
      this.alertas.alerterror();
    }
  );
}
// Editar Inventario Taller
editarInventarioTallerId(): void {
  // Obtenemos el id  en una constante para pasarlo por parametro
  const id = this.formularioRegistro.value.id;
  this.servicioInventarioTaller.editarInventarioTallerId(this.formularioRegistro.value, id).subscribe(
    (res) => {
      this.alertas.alertedit();
      this.getInventarioTaller();
      this.cerrarModal();
    },
    (error) => {
      console.log(error);
      this.alertas.alerterror();
    }
  );
}
// Eliminar inventario de taller
eliminarInventarioTaller(inventario: InventarioTaller): void{
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

    this.servicioInventarioTaller.eliminarInventarioTaller(inventario).subscribe(
      (res) => {
        console.log(res);
        this.getInventarioTaller();
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
 // Busqueda de de taller por nombre
 busquedaTaller(): void{
  if (this.buscar_taller == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioInventarioTaller.busquedaTaller(this.buscar_taller).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Taller = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Taller = false;
        }
        this.listadoInventarioTaller = res;
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
  this.getInventarioTaller();
  this.buscar_taller = "";
}

// Limpiar los campos
cancelar(): void{
  this.formularioRegistro.reset();
  this.btnGuardar = false;
  this.btnEditar = true;
}
}
