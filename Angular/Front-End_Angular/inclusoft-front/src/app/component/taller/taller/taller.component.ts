import { Component, OnInit } from '@angular/core';
// Importamos librerias necesarias
import { FormBuilder, Validators } from '@angular/forms';
import { Taller } from '../../../entidades/taller/taller/taller';
import { TallerService } from '../../../service/taller/taller/taller.service';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css'],
})
export class TallerComponent implements OnInit {
  // Utilizamos el array solo para poder guardar el resultado de la peticion para mostrar en la tabla
  listadoTalleres: Taller[] = [];

  // Variables Botones
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioTaller: TallerService,
    private formBuilder: FormBuilder,
    private alertas: AlertService
  ) {}

  // Formulario reactivo para el registro de datos de la pagina
  formularioRegistro = this.formBuilder.group({
    id: [''],
    nombre_taller: ['', [Validators.required]],
    observaciones: ['', [Validators.required]],
    dias: ['', [Validators.required]],
    horarios: ['', [Validators.required]],
  });

  ngOnInit(): void {
    // Ejecutamos los dos metodos al iniciar la carga de la pagina web
    this.getTalleres();
    this.btnEditar = true;
  }

  getTalleres(): void {
    this.servicioTaller.getTalleres().subscribe(
      (res) => {
        console.log('resultado' + res);
        this.listadoTalleres = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Registrar Taller
  registrarTaller(): void {
    if (this.formularioRegistro.valid) {
      this.servicioTaller
        .registrarTaller(this.formularioRegistro.value)
        .subscribe(
          (res) => {
            this.alertas.alertsuccess();
            this.getTalleres();
            this.formularioRegistro.reset();
          },
          (error) => {
            this.alertas.alerterror();
          }
        );
    } else {
      this.alertas.alertcampos();
    }
  }

  // Obtener taller por id para mostrar los campos en los input para su proxima edicion
  TallerId(taller: Taller): void {
    this.servicioTaller.getTallerId(taller).subscribe(
      (res) => {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          nombre_taller: res[0].nombre_taller,
          dias: res[0].dias,
          horarios: res[0].horarios,
          observaciones: res[0].observaciones,
        });
        this.btnEditar = false;
        this.btnRegistrar = true;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }

  // Editar taller ya obtenido por el ID
  editarTallerId(): void {
    // Obtenemos el id para pasarlo por parametro
    const id = this.formularioRegistro.value.id;
    this.servicioTaller
      .editarTallerId(this.formularioRegistro.value, id)
      .subscribe(
        (res) => {
          console.log(res);
          this.alertas.alertedit();
          this.getTalleres();
          this.cancelar();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      );
  }

  //Elimianr taller enviado por id
  eliminarTaller(taller: Taller): void {
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
        this.servicioTaller.eliminarTaller(taller.id).subscribe((res) => {
          this.getTalleres();
        });
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }
    });
  }
  // Limpiar los campos
  cancelar(): void {
    this.formularioRegistro.reset();
    this.btnEditar = true;
    this.btnRegistrar = false;
  }
}
