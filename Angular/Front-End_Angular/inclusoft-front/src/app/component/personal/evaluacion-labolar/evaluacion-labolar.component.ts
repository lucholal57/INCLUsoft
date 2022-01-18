import { Component, OnInit } from '@angular/core';
// IMPORTAMOS LAS CLASES DE ENTIDADES NECESARIAS Y SERVICIOS
import { EvaluacionLaboral } from 'src/app/entidades/personal/evaluacion-laboral/evaluacion-laboral';
import { EvaluacionLaboralService } from 'src/app/service/personal/evaluacion-laboral/evaluacion-laboral.service';
import { Personal } from '../../../entidades/personal/personal/personal';
import { PersonalService } from '../../../service/personal/personal/personal.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-evaluacion-labolar',
  templateUrl: './evaluacion-labolar.component.html',
  styleUrls: ['./evaluacion-labolar.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class EvaluacionLabolarComponent implements OnInit {
  // Variable P para el conteo del paginado
  p: number = 1;
  // Array de evaluaciones laborales
  listadoEvaluacionLaboral: EvaluacionLaboral[];
  // Array de personal para el select
  listadoPersonal: Personal[];
   //  variable para buscar por personalo
   buscar_personal= "";

  // Variable de Botones para deshabilitar
  public btnGuardar = false;
  public btnEditar = false;
  public btnCancelar = false;
  public ocultarbusqueda_Personal = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioPersonal: PersonalService,
    private servicioEvaluacionLaboral: EvaluacionLaboralService,
    private formBuilder: FormBuilder,
    private alertas: AlertService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }

  // Formulario reactivo para el registro de datos
  formularioRegistro = this.formBuilder.group({
    id: [''],
    personal: ['',[Validators.required]],
    observaciones_laboral: ['',[Validators.required]],
  })

  ngOnInit(): void {
    this.getPersonal();
    this.getEvaluacionLaboral();
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

  // Obtenemos todo el personal para mostraren la lista de seleccion para registrar una evaluacion laboral
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
  // Obtener todas las evaluaciones laborales
  getEvaluacionLaboral(): void {
    this.servicioEvaluacionLaboral.getEvaluacionLaboral().subscribe(
      (res) => {
        this.listadoEvaluacionLaboral = res;
        console.log(res);
      },
      (error)=> {

        this.alertas.alerterror();
      }
    )
  }
  // Registrar evaluacion Laboral
  registrarEvaluacionLaboral(): void {
    if (this.formularioRegistro.valid) {
      this.servicioEvaluacionLaboral.registrarEvaluacionLaboral(this.formularioRegistro.value).subscribe(
        (res) => {
          this.alertas.alertsuccess();
          this.getEvaluacionLaboral();
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
  // Obtener evaluacion laboral por id para mostrar en los campos de los imput para su proxima edicion
  EvaluacionLaboralId(evaluacionlaboral: EvaluacionLaboral, content:any): void {
  this.modalService.open(content,{size:'lg'});
  this.btnCancelar = true;
  this.btnEditar = false;
  this.btnGuardar = true;
    this.servicioEvaluacionLaboral.getEvaluacionesLaboralesId(evaluacionlaboral).subscribe(
      (res)=> {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          personal: res[0].personal,
          observaciones_laboral: res[0].observaciones_laboral,
        });
      },
      (eror)=> {
        this.alertas.alerterror();
      }
    );
  }
  // Editar Evaluacion Laboral
  editarEvaluacionLaboralId(): void {
    // Obtenemos el id para pasarlo por parametro
    const id= this.formularioRegistro.value.id;
    if (this.formularioRegistro.valid) {
      this.servicioEvaluacionLaboral.editarEvaluacionLaboralId(this.formularioRegistro.value, id).subscribe(
        (res)=> {
          console.log(res);
          this.alertas.alertedit();
          this.getEvaluacionLaboral();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
          this.alertas.alerterror();
        }
      )
    } else {
      this.alertas.alertcampos();
    }

  }
  // Elimar Evaluacion Laboral
  eliminarEvaluacionLaboral(evaluacionlaboral: EvaluacionLaboral): void {
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
        this.servicioEvaluacionLaboral.elimarEvaluacionLaboral(evaluacionlaboral).subscribe(
          (res) => {
            console.log(res);
            this.getEvaluacionLaboral();
          },
          (error) => {
            console.log(error);
          }
        );
        Swal.fire('Eliminado!', 'Se eleccion ha sido eliminada.', 'success');
      }

    });
  }
  // Busqueda de asistencias por personal
busquedaPersonal(): void{
  if (this.buscar_personal == ""){
    this.alertas.alertcampos();
  }else{
    this.servicioEvaluacionLaboral.busquedaPersonal(this.buscar_personal).subscribe(
      (res) => {
        console.log(res)
        if (res.length != 0){
          this.alertas.alertLoading();
          this.ocultarbusqueda_Personal = false;
        }else{
          this.alertas.alertLoadingError();
          this.ocultarbusqueda_Personal = false;
        }
        this.listadoEvaluacionLaboral = res;
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
  this.getEvaluacionLaboral()
  this.buscar_personal = "";
}
   // Linpiar los campos
cancelar(): void{
    this.formularioRegistro.reset();
    this.btnGuardar = false;
    this.btnEditar = true;
  }

}
