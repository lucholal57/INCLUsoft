import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './component/alumno/alumno/alumno.component';
import { DatosAdicionalesComponent } from './component/alumno/datos-adicionales/datos-adicionales.component';
import { AsistenciaComponent } from './component/alumno/asistencia/asistencia.component';
import { MenuComponent } from './component/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AntecedenteMedicoComponent } from './component/alumno/antecedente-medico/antecedente-medico.component';
import { PatologiaComponent } from './component/alumno/patologia/patologia.component';
import { EnfermeriaComponent } from './component/alumno/enfermeria/enfermeria.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ActaCompromisoComponent } from './component/alumno/acta-compromiso/acta-compromiso.component';
import { PersonalComponent } from './component/personal/personal/personal.component';
import { PermisoSalidaComponent } from './component/personal/permiso-salida/permiso-salida.component';
import { EvaluacionLabolarComponent } from './component/personal/evaluacion-labolar/evaluacion-labolar.component';
import { AsistenciaPersonalComponent } from './component/personal/asistencia-personal/asistencia-personal.component';
import { EntregaProyectoComponent } from './component/personal/entrega-proyecto/entrega-proyecto.component';
import { LoginComponent } from './component/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    DatosAdicionalesComponent,
    AsistenciaComponent,
    MenuComponent,
    AntecedenteMedicoComponent,
    PatologiaComponent,
    EnfermeriaComponent,
    InicioComponent,
    ActaCompromisoComponent,
    PersonalComponent,
    PermisoSalidaComponent,
    EvaluacionLabolarComponent,
    AsistenciaPersonalComponent,
    EntregaProyectoComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
