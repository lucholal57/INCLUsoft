import { Component, OnInit } from '@angular/core';
// Importamops las clases de entidades necesarias y servicios
import { CompraTaller } from 'src/app/entidades/taller/compra-taller/compra-taller';
import { CompraTallerService } from '../../../service/taller/compra-taller/compra-taller.service';
import { Cooperadora } from '../../../entidades/cooperadora/cooperadora';
import { CooperadoraService } from 'src/app/service/cooperadora/cooperadora.service';

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
  // VAriable para comparar si la plata de caja chica alcanza para comprar el material
  Cooperadora : Cooperadora[];
  // Variable con el valor de caja chica
  valor_caja_chica : number ;
  caja_chica_objeto = new Object();
  resultado_caja_chica_total: number;

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
    private servicioCooperadora : CooperadoraService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    insumos: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    fecha_compra: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    observaciones_compra: ["",[Validators.required]],
    total: ['', [Validators.required]],
    taller: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getTalleres();
    this.getComprasTaller();
    this.btnEditar = false;
    this.ocultarbusqueda_Taller = true;
    // Iniciamos en 0 el valor de la caja chica
    this.valor_caja_chica = 0;
    this.resultado_caja_chica_total=0;

    // Traer al recargar la pagina el valor de caja chica para poder hacer la comparacion a la hora de comprar materiales
    this.servicioCooperadora.getCooperadora().subscribe(
      (res) => {
        this.Cooperadora= res;
        this.Cooperadora.forEach(a => {
          this.valor_caja_chica = a.caja_chica;
        })
      },
      (error) => {
        this.alertas.alerterror();
      }
   );
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
  calcularTotal(): void {
    this.formularioRegistro.controls["total"].setValue(this.formularioRegistro.value.total = this.formularioRegistro.value.cantidad * this.formularioRegistro.value.precio)

  }
  limpiarTotal(): void {
    this.formularioRegistro.controls["total"].setValue("");
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
  // Registrar compras para el taller validando que la compra no supere el monto de la caja chica
  registrarComprasTaller(): void {
    //Variable para el resultado de la resta y se pone en 0 para que cada ves que entre aranque en 0
    this.resultado_caja_chica_total=0
    //Validacion de si el total de la compra es menos a lo que contiene la caja chica
    if (this.formularioRegistro.value.total <= this.valor_caja_chica)
    {
      //Resta de total menos caja chica guardando el valor en variable para editar el valor de caja chica
      this.resultado_caja_chica_total = this.valor_caja_chica - this.formularioRegistro.value.total
      //Al objeto ya creado le pasamos los datos que va a enviar el servicio para editar la caja chica, tambien pasamos el numero 1 ya que sabemos que solo existe una caja chica con el id=1
      this.caja_chica_objeto = {caja_chica: this.resultado_caja_chica_total}
      //Validamos que el formulario sea valido y registramos la compra
      if (this.formularioRegistro.valid) {
        this.servicioCompraTaller
          .registrarCompraTaller(this.formularioRegistro.value)
          .subscribe(
            (res) => {
              this.getComprasTaller();
              this.cerrarModal();
              //LLamamos al servicio de cooperadora para editar la caja chica pasando el objeto creado anteriormente.
              this.servicioCooperadora.editarCooperadora(this.caja_chica_objeto, 1).subscribe(
                (res) => {
                  this.alertas.alertDescuentoCajaChicaOk()
                },
                (error) => {
                  console.log(error);
                }
              )
            },
            (error) => {
              this.alertas.alerterror();
            }
          );
      } else {
        this.alertas.alertcampos();
      }
    }
    else {
      this.alertas.alertDescuentoCajaChicaError();
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
          cantidad: res[0].cantidad,
          fecha_compra: res[0].fecha_compra,
          precio: res[0].precio,
          observaciones_compra: res[0].observaciones_compra,
          total: res[0].total,
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
