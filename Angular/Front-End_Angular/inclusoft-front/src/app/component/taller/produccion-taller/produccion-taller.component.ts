import { Component, OnInit } from '@angular/core';
// Impotamos las clases de entidades necesarias y servicios
import { ProduccionTaller } from 'src/app/entidades/taller/produccion-taller/produccion-taller';
import { ProduccionTallerService } from 'src/app/service/taller/produccion-taller/produccion-taller.service';

import { Taller } from '../../../entidades/taller/taller/taller';
import { TallerService } from '../../../service/taller/taller/taller.service';

//Importamos librerias de compra taller para validar si el insumo alcanza para realizar produccion
import { CompraTaller } from 'src/app/entidades/taller/compra-taller/compra-taller';
import { CompraTallerService } from '../../../service/taller/compra-taller/compra-taller.service';

//Importamos materiales talle para obtener del select la compr en base de datos y podes descontar el stock
import { MaterialesTaller } from 'src/app/entidades/taller/materiales-taller/materiales-taller';
import { MaterialesTallerService } from '../../../service/taller/materiales-taller/materiales-taller.service';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-produccion-taller',
  templateUrl: './produccion-taller.component.html',
  styleUrls: ['./produccion-taller.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ProduccionTallerComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de produccion de taller
  listadoProduccionTaller: ProduccionTaller[];
  // Array de talleres para el select
  listadoTalleres: Taller[];
  // Array de materiales de taller
  listadoMaterialesTaller: MaterialesTaller[];
  //Array para guardar el valor del insumo seleccionado para ver su estock y poder producir
  insumos_stock: MaterialesTaller[];
  //objeto materiales taller para enviar a la tabla de materiales despues de comprar
  objeto_materiales: MaterialesTaller;
  //  variable para buscar por personalo
  // variable para buscar por personalo
  buscar_taller = '';
  //Variable para obtener el valor del listado de compras taller cuando sea igual a lo que selecciono
  nombre_insumo = '';
  // Variable de Botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Taller = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioTaller: TallerService,
    private servicioProduccionTaller: ProduccionTallerService,
    private formBuilder: FormBuilder,
    private alertas: AlertService,
    private servicioMaterialesTaller: MaterialesTallerService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    nombre_produccion: ['', [Validators.required]],
    fecha_produccion: ['', [Validators.required]],
    materiales: ['', [Validators.required]],
    costo_venta: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    taller: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getTalleres();
    this.getProduccionTaller();
    this.listadoMaterialesTaller = [];
        //solo para mostrar los materiales en el select
    this.getMaterialesTaller();
    this.btnEditar = true;
    this.ocultarbusqueda_Taller = true;
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

  // Obtenmemos los talleres para mostrar en la lista de seleccion al registrar una produccion
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

  // Obtenemos los materiales del taller
  getMaterialesTaller(): void {
    this.servicioMaterialesTaller.getMaterialesTaller().subscribe(
      (res) => {
        this.listadoMaterialesTaller = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
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

  // Registrar produccion de taller
  registrarProduccionTaller(): void {
    //limpiamos el objeto para que cuando entre al if entre vacio para registrar el material
    this.objeto_materiales = new MaterialesTaller();
    //VAriable para obtener la diferencia entre lo que usa para producir y lo que resta en el stock
    var restacantidadstock = 0;
    //Enviamos el nombre del material para obtener el objeto correcto
    this.servicioMaterialesTaller
      .getMaterialesTallerProduccion(this.formularioRegistro.value.materiales)
      .subscribe(
        (res) => {
          this.insumos_stock = res;
          // Recorremos un for que es solo de una posicion para validar que los materiales para producir no son mayores al stock
          for (let a of this.insumos_stock) {
            //validamos
            if (this.formularioRegistro.value.cantidad <= a.cantidad) {
              // Si entra guardamos la diferencia para despues ser editada la posicion de cantidad en compras materiales y descontar del stock
              restacantidadstock =
                a.cantidad - this.formularioRegistro.value.cantidad;
              //Validamos que el formulario este correctamente cargado
              if (this.formularioRegistro.valid) {
                //DE ser asi ejecutamos la funcion de registrar produccion
                this.servicioProduccionTaller
                  .registrarProduccionTaller(this.formularioRegistro.value)
                  .subscribe(
                    (res) => {
                      this.alertas.alertsuccess();
                      this.getProduccionTaller();
                      this.cerrarModal();
                    },
                    (error) => {
                      this.alertas.alerterror();
                    }
                  );
                  console.log("resultado regis produccion",this.objeto_materiales)
                this.objeto_materiales = {
                  id: a.id,
                  insumos_disponibles: a.insumos_disponibles,
                  cantidad: restacantidadstock,
                  taller: a.taller,
                };
                this.servicioMaterialesTaller.editarMaterialesTallerId(this.objeto_materiales, a.id).subscribe(
                  (res) => {
                    console.log(res);
                  },
                  (error) => {
                    console.log(error);
                  }
                )
              } else {
                this.alertas.alertcampos();
              }
            } else {
              this.alertas.alertStock();
            }
          }
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }

  // Obtener produccion de taller por id para mostrar en el formulario y poder editar
  ProduccionTallerId(produccion: ProduccionTaller, content: any): void {
    this.modalService.open(content, { size: 'lg' });
    this.btnCancelar = true;
    this.btnEditar = false;
    this.btnGuardar = true;
    this.servicioProduccionTaller.getProduccionTallerId(produccion).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          nombre_produccion: res[0].nombre_produccion,
          fecha_produccion: res[0].fecha_produccion,
          materiales: res[0].materiales,
          costo_venta: res[0].costo_venta,
          cantidad: res[0].cantidad,
          taller: res[0].taller,
        });
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Editar Produccion de taller
  editarProduccionTallerId(): void {
    // Obtenemos el id en una costante para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioProduccionTaller
      .editarProduccionTallerId(this.formularioRegistro.value, id)
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getProduccionTaller();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }
  // Eliminar produccion taller
  eliminarProduccionTaller(produccion: ProduccionTaller): void {
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
        this.servicioProduccionTaller
          .eliminarProduccionTaller(produccion)
          .subscribe(
            (res) => {
              console.log(res);
              this.getProduccionTaller();
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
      this.servicioProduccionTaller
        .busquedaTaller(this.buscar_taller)
        .subscribe(
          (res) => {
            console.log(res);
            if (res.length != 0) {
              this.alertas.alertLoading();
              this.ocultarbusqueda_Taller = false;
            } else {
              this.alertas.alertLoadingError();
              this.ocultarbusqueda_Taller = false;
            }
            this.listadoProduccionTaller = res;
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
    this.getProduccionTaller();
    this.buscar_taller = '';
  }
  // Limpiar los campos
  cancelar(): void {
    this.formularioRegistro.reset();
    this.btnGuardar = false;
    this.btnEditar = true;
  }
}
