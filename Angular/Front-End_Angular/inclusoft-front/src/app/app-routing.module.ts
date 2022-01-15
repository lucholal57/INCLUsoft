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
import { TallerComponent } from './component/taller/taller/taller.component';
import { InformesCuatrimestralesComponent } from './component/taller/informes-cuatrimestrales/informes-cuatrimestrales/informes-cuatrimestrales.component';
import { MaterialesTallerComponent } from './component/taller/materiales-taller/materiales-taller/materiales-taller.component';
import { VentasTallerComponent } from './component/taller/ventas-taller/ventas-taller/ventas-taller.component';
import { ProduccionTallerComponent } from './component/taller/produccion-taller/produccion-taller.component';
import { CompraTallerComponent } from './component/taller/compra-taller/compra-taller.component';
import { InventarioTallerComponent } from './component/taller/inventario-taller/inventario-taller.component';
import { AcompananteComponent } from './component/acompanante/acompanante.component';
import { ViajeComponent } from './component/viaje/viaje.component';
import { EstadisticaComponent} from './component/estadistica/estadistica.component';





const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'inicio', component: InicioComponent},
  //Rutas Alumnos
  {path:'alumno', component: AlumnoComponent},
  {path:'alumno/datos_adicionales', component: DatosAdicionalesComponent},
  {path:'alumno/asistencia', component: AsistenciaComponent},
  {path:'alumno/antecedentes_medicos', component: AntecedenteMedicoComponent},
  {path:'alumno/patologias', component: PatologiaComponent},
  {path:'alumno/enfermeria', component: EnfermeriaComponent},
  {path:'alumno/acta_compromiso', component: ActaCompromisoComponent},
  //Rutas Personal
  {path:'personal', component: PersonalComponent},
  {path:'personal/asistencia', component: AsistenciaPersonalComponent},
  {path:'personal/permiso_salida', component: PermisoSalidaComponent},
  {path:'personal/evaluacion_laboral', component: EvaluacionLabolarComponent},
  {path:'personal/entrega_proyecto', component: EntregaProyectoComponent},
  //Rutas Talleres
  {path:'taller', component: TallerComponent},
  {path:'taller/informes_cuatrimestrales', component: InformesCuatrimestralesComponent},
  {path:'taller/materiales_taller', component: MaterialesTallerComponent},
  {path:'taller/ventas_taller', component: VentasTallerComponent},
  {path:'taller/produccion_taller', component: ProduccionTallerComponent},
  {path:'taller/compra_taller', component: CompraTallerComponent},
  {path:'taller/inventario_taller', component: InventarioTallerComponent},
  //Rutas Acompañantes
  {path:'acompañantes', component: AcompananteComponent},
  //Rutas Viajes
  {path:'viajes', component: ViajeComponent},
  //Rutas estadisticas
  {path:'estadisticas', component: EstadisticaComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
