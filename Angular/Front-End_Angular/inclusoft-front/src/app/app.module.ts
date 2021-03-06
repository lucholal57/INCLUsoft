import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {NgxPaginationModule} from 'ngx-pagination';

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
import { TallerComponent } from './component/taller/taller/taller.component';
import { VentasTallerComponent } from './component/taller/ventas-taller/ventas-taller/ventas-taller.component';
import { ProduccionTallerComponent } from './component/taller/produccion-taller/produccion-taller.component';
import { CompraTallerComponent } from './component/taller/compra-taller/compra-taller.component';
import { InventarioTallerComponent } from './component/taller/inventario-taller/inventario-taller.component';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { AcompananteComponent} from './component/acompanante/acompanante.component';
import { ViajeComponent } from './component/viaje/viaje.component'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EstadisticaComponent } from './component/estadistica/estadistica.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialesTallerComponent } from './component/taller/materiales-taller/materiales-taller.component';
import { InformesCuatrimestralesComponent } from './component/taller/informes-cuatrimestrales/informes-cuatrimestrales.component';
import { CookieService } from 'ngx-cookie-service';
import { SocioComponent } from './component/biblioteca/socio/socio.component';
import { LibroComponent } from './component/biblioteca/libro/libro.component';
import { PrestamoComponent } from './component/biblioteca/prestamo/prestamo.component';
import { DevolucionComponent } from './component/biblioteca/devolucion/devolucion.component';
import { CooperadoraComponent } from './component/cooperadora/cooperadora.component';

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
    TallerComponent,
    InformesCuatrimestralesComponent,
    MaterialesTallerComponent,
    VentasTallerComponent,
    ProduccionTallerComponent,
    CompraTallerComponent,
    InventarioTallerComponent,
    AcompananteComponent,
    ViajeComponent,
    EstadisticaComponent,
    SocioComponent,
    LibroComponent,
    PrestamoComponent,
    DevolucionComponent,
    CooperadoraComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxChartsModule,
    BrowserAnimationsModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
