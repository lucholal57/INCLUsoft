import { Component, OnInit } from '@angular/core';
// IMPORTAMOS LAS CLASES DE ENTIDADES NECESARIAS Y SERVICIOS
import { EvaluacionLaboral } from 'src/app/entidades/personal/evaluacion-laboral/evaluacion-laboral';
import { EvaluacionLaboralService } from 'src/app/service/personal/evaluacion-laboral/evaluacion-laboral.service';
import { Personal } from '../../../entidades/personal/personal/personal';
import { PersonalService } from '../../../service/personal/personal/personal.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-evaluacion-labolar',
  templateUrl: './evaluacion-labolar.component.html',
  styleUrls: ['./evaluacion-labolar.component.css']
})
export class EvaluacionLabolarComponent implements OnInit {
  // Array de evaluaciones laborales
  listadoEvaluacionLaboral: EvaluacionLaboral[];
  // Array de personal para el select
  listadoPersonal: Personal[];

  // Variable de Botones para deshabilitar
  public btnRegistrar = false;
  public btnEditar = false;
  public btnCancelar = false;

  // Injeccion de o los servicios a utilizar
  constructor(
    private servicioPersonal: PersonalService,
    private servicioEvaluacionLaboral: EvaluacionLaboralService,
    private formBuilder: FormBuilder,
    private alertas: AlertService
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
          this.formularioRegistro.reset();
          this.getEvaluacionLaboral();
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
  EvaluacionLaboralId(evaluacionlaboral: EvaluacionLaboral): void {
    this.servicioEvaluacionLaboral.getEvaluacionesLaboralesId(evaluacionlaboral).subscribe(
      (res)=> {
        this.formularioRegistro.patchValue({
          id: res[0].id,
          personal: res[0].personal,
          observaciones_laboral: res[0].observaciones_laboral,
        });
        this.btnEditar = false;
        this.btnRegistrar = true;
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
          this.cancelar();
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
   // Linpiar los campos
   cancelar(): void{
    this.formularioRegistro.reset();
    this.btnRegistrar = false;
    this.btnEditar = true;
  }

}
