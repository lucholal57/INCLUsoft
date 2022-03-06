import { Component, OnInit } from '@angular/core';
// Importamos las clases de entidades necesarias y servicios
import { VentasTaller } from '../../../../entidades/taller/ventas-taller/ventas-taller';
import { VentasTallerService } from '../../../../service/taller/ventas-taller/ventas-taller.service';
// importamos las la entidad y el servicio de produccion para traer el resultado de lo talleres que si tengan una produccion
import { ProduccionTaller } from 'src/app/entidades/taller/produccion-taller/produccion-taller';
import { ProduccionTallerService } from '../../../../service/taller/produccion-taller/produccion-taller.service';

import { Taller } from '../../../../entidades/taller/taller/taller';
import { TallerService } from '../../../../service/taller/taller/taller.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ventas-taller',
  templateUrl: './ventas-taller.component.html',
  styleUrls: ['./ventas-taller.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class VentasTallerComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de ventas taller
  listadoVentasTaller: VentasTaller[];
  // Array de talleres para el select
  listadoTalleres: Taller[];
  // Array de produccion talleres
  listadoProduccionTaller: ProduccionTaller[];
  //Variable producto para una ves seleccionado el taller traiga los productos de ese mismo
  arrayProductoSeleccion: ProduccionTaller[];
  //Objeto para poder enviar y editando descontar el stock de produccion
  descuento_produccion: ProduccionTaller;
  //Resultado de cantidad por precio para saber la ganancia
  total_ganancia = 0;
  // variable para buscar por personalo
  buscar_taller = '';
  // Variable de Botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Taller = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioTaller: TallerService,
    private servicioVentasTaller: VentasTallerService,
    private formBuilder: FormBuilder,
    private alertas: AlertService,
    config: NgbModalConfig,
    private servicioProduccionTaller: ProduccionTallerService,
    private modalService: NgbModal
  ) {}

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    ganancia: ['', [Validators.required]],
    observacion_ventas: ['', [Validators.required]],
    producto: ['', [Validators.required]],
    cantidad_producto: ['', [Validators.required]],
    taller: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getTalleres();
    this.getVentasTaller();
    this.getProduccionTaller();
    this.btnEditar = true;
    this.ocultarbusqueda_Taller = true;
    this.total_ganancia = 0;
  }
  // Open funcion para abrir ventana modal
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.btnEditar = true;
    this.btnGuardar = false;
    this.btnCancelar = false;
  }
  // Funcion para cerrar ventana modal
  cerrarModal(): void {
    this.modalService.dismissAll();
    this.formularioRegistro.reset();
  }

  productoSeleccionado(): void {
    this.arrayProductoSeleccion = new Array();
    this.servicioProduccionTaller
      .busquedaTallerId(this.formularioRegistro.value.taller)
      .subscribe(
        (res) => {
          this.arrayProductoSeleccion = res;
        },
        (error) => {
          this.alertas.alerterror();
        }
      );
  }

  // Obtenemos las producciones de taller
  getProduccionTaller(): void {
    this.servicioProduccionTaller.getProduccionTaller().subscribe(
      (res) => {
        this.listadoProduccionTaller = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
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
  // Obtenemos las ventas de los talleres
  getVentasTaller(): void {
    this.servicioVentasTaller.getVentasTaller().subscribe(
      (res) => {
        this.listadoVentasTaller = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
  }
  // Registrar ventas de taller
  registrarVentasTaller(): void {
    this.total_ganancia = 0;
    var resultado_resta = 0;
    this.descuento_produccion = new ProduccionTaller();
    this.arrayProductoSeleccion.forEach((a) => {
      if (this.formularioRegistro.value.cantidad_producto <= a.cantidad) {
        this.formularioRegistro.controls['ganancia'].setValue(a.costo_venta * this.formularioRegistro.value.cantidad_producto)
        if (this.formularioRegistro.valid) {
          this.servicioVentasTaller
            .registrarVentasTaller(this.formularioRegistro.value)
            .subscribe(
              (res) => {
                this.alertas.alertsuccess();
                this.getVentasTaller();
                this.cerrarModal();
              },
              (error) => {
                this.alertas.alerterror();
              }
            );
        } else {
          this.alertas.alertcampos();
        }

        resultado_resta = a.cantidad - this.formularioRegistro.value.cantidad_producto
        this.descuento_produccion = {
          id: a.id,
          nombre_produccion: a.nombre_produccion,
          fecha_produccion: a.fecha_produccion,
          materiales: a.materiales,
          costo_venta: a.costo_venta,
          cantidad: resultado_resta,
          taller: a.taller,
        }
        console.log("Resultado para enviar a editar produccion taller",this.descuento_produccion)
        this.servicioProduccionTaller
          .editarProduccionTallerId(this.descuento_produccion, a.id)
          .subscribe((res) => {
          });
      } else {
        this.alertas.alertStock();
      }
    });
  }
  // Obtenemos ventas de taller por id para mostrar en el formulario para su edicion
  VentasTallerId(ventas: VentasTaller, content: any): void {
    this.modalService.open(content, { size: 'lg' });
    this.btnCancelar = true;
    this.btnEditar = false;
    this.btnGuardar = true;
    this.servicioVentasTaller.getVentasTallerId(ventas).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          ganancia: res[0].ganancia,
          observacion_ventas: res[0].observacion_ventas,
          producto: res[0].producto,
          cantidad_producto: res[0].cantidad_producto,
          taller: res[0].taller,
        });
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Editar ventas de taller
  editarVentasTallerId(): void {
    // Obtenemos el id en una constante para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioVentasTaller
      .editarVentasTallerId(this.formularioRegistro.value, id)
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getVentasTaller();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }
  // Eliminar ventas de taller
  eliminarVentasTaller(ventas: VentasTaller): void {
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
        this.servicioVentasTaller.eliminarVentasTaller(ventas).subscribe(
          (res) => {
            console.log(res);
            this.getVentasTaller();
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
  busquedaTaller(): void {
    if (this.buscar_taller == '') {
      this.alertas.alertcampos();
    } else {
      this.servicioVentasTaller.busquedaTaller(this.buscar_taller).subscribe(
        (res) => {
          console.log(res);
          if (res.length != 0) {
            this.alertas.alertLoading();
            this.ocultarbusqueda_Taller = false;
          } else {
            this.alertas.alertLoadingError();
            this.ocultarbusqueda_Taller = false;
          }
          this.listadoVentasTaller = res;
        },
        (error) => {
          this.alertas.alerterror();
        }
      );
    }
  }
  // Cancelar Busqueda
  cancelarbusqueda(): void {
    this.ocultarbusqueda_Taller = true;
    this.getVentasTaller();
    this.buscar_taller = '';
  }
  // Limpiar los campos
  cancelar(): void {
    this.formularioRegistro.reset();
    this.btnGuardar = false;
    this.btnEditar = true;
  }
}
