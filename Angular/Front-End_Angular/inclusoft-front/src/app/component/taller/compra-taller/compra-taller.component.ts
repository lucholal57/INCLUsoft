import { Component, OnInit } from '@angular/core';
// Importamops las clases de entidades necesarias y servicios
import { CompraTaller } from 'src/app/entidades/taller/compra-taller/compra-taller';
import { CompraTallerService } from '../../../service/taller/compra-taller/compra-taller.service';

import { Taller } from '../../../entidades/taller/taller/taller';
import { TallerService } from '../../../service/taller/taller/taller.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-compra-taller',
  templateUrl: './compra-taller.component.html',
  styleUrls: ['./compra-taller.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class CompraTallerComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de compras de taller
  listadoComprasTaller: CompraTaller[];
  // Array de talleres
  listadoTalleres: Taller[];
  //  variable para buscar por personalo
  buscar_taller= "";
  // Variable de Botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Taller = false;

  // Injenccion de o los servicios a utilizar
  constructor(
    private servicioTaller: TallerService,
    private servicioCompraTaller: CompraTallerService,
    private formBuilder: FormBuilder,
    private alertas: AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    insumos: ['', [Validators.required]],
    observaciones_compra: ['', [Validators.required]],
    taller: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getTalleres();
    this.getComprasTaller();
    this.btnEditar = false;
    this.ocultarbusqueda_Taller = false;
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

  // Obtenemos los talleres para mostar en la lista de seleccion al registrar una compra para taller
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
  // Obtenemnos compras de taller
  getComprasTaller(): void {
    this.servicioCompraTaller.getCompraTaller().subscribe(
      (res) => {
        this.listadoComprasTaller = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Registrar compras para el taller|
  registrarComprasTaller(): void {
    if (this.formularioRegistro.valid) {
      this.servicioCompraTaller
        .registrarCompraTaller(this.formularioRegistro.value)
        .subscribe(
          (res) => {
            this.alertas.alertsuccess();
            this.getComprasTaller();
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
  // Obetener compras de taller por id para mostrar en el formulario y poder editar
  ComprasTallerId(compra: CompraTaller, content : any): void {
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
    this.servicioCompraTaller.getCompraTallerId(compra).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          insumos: res[0].insumos,
          observaciones_compra: res[0].observaciones_compra,
          taller: res[0].taller,
        });
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
  }
  // Editar Compras Taller
  editarComprasTallerId(): void {
    // Obtenemos id en una constante para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioCompraTaller
      .editarCompraTallerId(this.formularioRegistro.value, id)
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getComprasTaller();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }
  // Eliminar compra taller
  eliminarComprasTaller(compra: CompraTaller): void {
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
        this.servicioCompraTaller.eliminarCompraTaller(compra).subscribe(
          (res) => {
            console.log(res);
            this.getComprasTaller();
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
    this.servicioCompraTaller.busquedaTaller(this.buscar_taller).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Taller = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Taller = false;
        }
        this.listadoComprasTaller = res;
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
  this.getComprasTaller();
  this.buscar_taller = "";
}
  // Limpiar los campos
  cancelar(): void {
    this.formularioRegistro.reset();
    this.btnGuardar = false;
    this.btnEditar = true;
  }
}
