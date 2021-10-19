import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* IMPORTACION DE LOS COMPONENTES PARA PODER HACER LAS RUTAS */
import { AlumnoComponent } from './component/alumno/alumno/alumno.component';
import { DatosAdicionalesComponent } from './component/alumno/datos-adicionales/datos-adicionales.component';
import { AsistenciaComponent } from './component/alumno/asistencia/asistencia.component';
import { MenuComponent } from './component/menu/menu.component';
import { AntecedenteMedicoComponent } from './component/alumno/antecedente-medico/antecedente-medico.component';
import {PatologiaComponent } from './component/alumno/patologia/patologia.component';
import { EnfermeriaComponent } from './component/alumno/enfermeria/enfermeria.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ActaCompromisoComponent } from './component/alumno/acta-compromiso/acta-compromiso.component';
import { PersonalComponent } from './component/personal/personal/personal.component';
import { LoginComponent } from './component/login/login.component';
import { AsistenciaPersonalComponent } from './component/personal/asistencia-personal/asistencia-personal.component';
import { PermisoSalidaComponent} from './component/personal/permiso-salida/permiso-salida.component'
import { EvaluacionLabolarComponent } from './component/personal/evaluacion-labolar/evaluacion-labolar.component';
import { EntregaProyectoComponent } from './component/personal/entrega-proyecto/entrega-proyecto.component';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'inicio', component: InicioComponent},
  //Rutas Alumnos
  {path:'alumno', component: AlumnoComponent},
  {path:'datos_adicionales', component: DatosAdicionalesComponent},
  {path:'asistencia', component: AsistenciaComponent},
  {path:'antecedentes_medicos', component: AntecedenteMedicoComponent},
  {path:'patologias', component: PatologiaComponent},
  {path:'enfermeria', component: EnfermeriaComponent},
  {path:'acta_compromiso', component: ActaCompromisoComponent},
  //Rutas Personal
  {path:'personal', component: PersonalComponent},
  {path:'personal/asistencia', component: AsistenciaPersonalComponent},
  {path: 'personal/permiso_salida', component: PermisoSalidaComponent},
  {path:'personal/evaluacion_laboral', component: EvaluacionLabolarComponent},
  {path:'personal/entrega_proyecto', component: EntregaProyectoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
