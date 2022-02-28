import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../service/alumno/alumno/alumno.service';
import { Personal } from '../../entidades/personal/personal/personal';
import { PersonalService } from '../../service/personal/personal/personal.service';
import { Patologia } from '../../entidades/alumno/patologia/patologia';
import { PatologiaService } from '../../service/alumno/patologia/patologia.service';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { AsistenciaService } from 'src/app/service/alumno/asistencia/asistencia.service';
import { Asistencia } from 'src/app/entidades/alumno/asistencia/asistencia';
import * as moment from 'moment';
import { AlertService } from 'src/app/service/alert/alert.service';
import { AsistenciaPersonal } from 'src/app/entidades/personal/asistencia-personal/asistencia-personal';
import { AsistenciaPersonalService } from 'src/app/service/personal/asistencia-personal/asistencia-personal.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css'],
})
export class EstadisticaComponent implements OnInit {
  //Listados para recibir los valores
  listadoAlumnos: Alumno[];
  listadoPersonal: Personal[];
  listadoPatologia: Patologia[];
  listadoAsistenciaAlumno: Asistencia[];
  listadoAsistenciaPersonal: AsistenciaPersonal[]
  //Filtros seleccion
  alumno_filtro: number;
  personal_filtro: number;
  //Busquedas para asistencias alumno y personal
  busqueda_alumno = 0;
  busqueda_personal = 0;
 //Array de totales con los nuevos objetos ya preparados para graficar estadisticamente
  totalPatologia = new Array();
  totalAsistenciaAlumno = new Array();
  totalProfesion = new Array();
  totalAsistenciaPersonal = new Array();
  total = new Array();
  //Variable booleana para mostrar y ocualtar condicionando con if los graficos en HTML
  patologiashow: boolean;
  asistenciashow : boolean;
  profesionshow:boolean;
  asistenciapersonalshow: boolean;
  //Fechas para buscar asistencias
  fecha_inicio_alumno = new Date();
  fecha_fin_alumno = new Date();
  fecha_inicio_personal = new Date();
  fecha_fin_personal = new Date();


  view: [number, number] = [500, 400];

  colorScheme = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FFFF06', '#FF0606', '#00FF00'],
  };
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(
    private alertas: AlertService,
    private servicioAlumno: AlumnoService,
    private servicioPersonal: PersonalService,
    private servicioPatologia: PatologiaService,
    private servicioAsistenciaPersonal: AsistenciaPersonalService,
    private servicioAsistencia: AsistenciaService
  ) {}

  ngOnInit(): void {
    /*
    this.servicioPersonal.getPersonal().subscribe((res) => {
      this.listadoPersonal = res;
      this.total.push(
        new Object({ name: 'Personal', value: this.listadoPersonal.length })
      );
      console.log(this.total, 'length personal');
      //Formula para poder guardar los datos de los graficos
      this.total = [...this.total];
    });
    this.servicioAlumno.getAlumnos().subscribe((res) => {
      this.listadoAlumnos = res;
      this.total.push(
        new Object({ name: 'Alumno', value: this.listadoAlumnos.length })
      );
      console.log(this.total, 'length alumno');
      //Formula para poder guardar los datos de los graficos
      this.total = [...this.total];
    })
    */

    this.getAlumnos();
    this.getPersonal();
    this.patologiashow = false;
    this.asistenciashow = false;
    this.profesionshow = false;
    this.asistenciapersonalshow = false;

  }

  // Obtener todos los Alumnos
  getAlumnos(): void {
    this.servicioAlumno.getAlumnos().subscribe(
      (res) => {
        this.listadoAlumnos = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }
  // Obtener todo el personal
  getPersonal(): void {
    this.servicioPersonal.getPersonal().subscribe(
      (res) => {
        console.log(res);
        this.listadoPersonal = res;
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }

  filtroAlumno(): void {
    this.patologiashow = true;
    this.asistenciashow= false;
    if (this.alumno_filtro == 2) {
      this.servicioPatologia.getPatologias().subscribe(
        (res) => {
          this.totalPatologia = [];
          var tea = 'TEA';
          var sindrome = 'SINDROME';
          var sordera = 'SORDERA';
          var contadortea = 0;
          var contadorsindrome = 0;
          var contadorsordera = 0;
          this.listadoPatologia = res;
          for (let a of this.listadoPatologia) {
            if (a.nombre_patologia === tea) {
              contadortea++;
            }
            if (a.nombre_patologia === sindrome) {
              contadorsindrome++;
            }
            if (a.nombre_patologia === sordera) {
              contadorsordera++;
            }
          }
          this.totalPatologia.push(
            new Object({ name: 'TEA', value: contadortea })
          );
          this.totalPatologia.push(
            new Object({ name: 'SINDROME', value: contadorsindrome })
          );
          this.totalPatologia.push(
            new Object({ name: 'SORDERA', value: contadorsordera })
          );
          this.totalPatologia = [...this.totalPatologia];
          console.log(this.totalPatologia);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.alumno_filtro == 3) {
      this.asistenciashow = true
      this.patologiashow = false;
      this.totalAsistenciaAlumno = [];
      this.servicioAsistencia.busquedaAlumnoEstadistica(this.busqueda_alumno).subscribe((res) => {
        /* DIFERENCIAS DE FECHAS EN NUMBER
        var fecha_inicio_alumno = new Date('2022-02-10');
        var fecha_fin_alumno = new Date('2022-02-08');
        var diferencia = +fecha_inicio - +fecha_fin_alumno;
        var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        */
        var presente = 'Presente';
        var ausente = 'Ausente';
        var contadorpresente = 0;
        var contadorausente = 0;
        this.listadoAsistenciaAlumno = res;
        for (let f of this.listadoAsistenciaAlumno) {
          if (
            moment(f.fecha_asistencia).isBetween(
              this.fecha_inicio_alumno,
              this.fecha_fin_alumno
            )
          ) {
            if (f.estado_asistencia == presente) {
              contadorpresente++;
            }
            if (f.estado_asistencia == ausente) {
              contadorausente++;
            }
          }
        }
        this.totalAsistenciaAlumno.push(
          new Object({ name: 'PRESENTE', value: contadorpresente })
        );
        this.totalAsistenciaAlumno.push(
          new Object({ name: 'AUSENTE', value: contadorausente })
        );
        this.totalAsistenciaAlumno = [...this.totalAsistenciaAlumno];

        console.log(
          this.totalAsistenciaAlumno,
          'resultado obtenido de las asistencias.'
        );
      });
    }
  }
  filtroPersonal(): void{
    if (this.personal_filtro ==2){
      this.profesionshow = true;
      this.asistenciapersonalshow = false;
      this.totalProfesion=[];
      this.servicioPersonal.getPersonal().subscribe(
        (res) => {
          var pomy = "Pomy"
          var docente = "Docente"
          var administrativo = "Administrativo"
          var contadorpomy = 0;
          var contadordocente = 0;
          var contadoradministrativo = 0;
          this.listadoPersonal = res;
          for (let p of this.listadoPersonal){
            if (p.profesion === pomy){
              contadorpomy++;
            }
            if (p.profesion === docente){
              contadordocente++;
            }
            if (p.profesion === administrativo){
              contadoradministrativo++;
            }
          }
          this.totalProfesion.push(
            new Object({name: 'Administrativo', value: contadoradministrativo})
          );
          this.totalProfesion.push(
            new Object({name: 'Docente', value: contadordocente})
          );
          this.totalProfesion.push(
            new Object({name: 'Pomy', value: contadorpomy})
          );
          this.totalProfesion = [...this.totalProfesion]
          console.log(this.totalProfesion,"PROFESIONES TOTALES")
        }
      )
    }
    if (this.personal_filtro == 3){
      this.asistenciapersonalshow = true;
      this.profesionshow = false;
      this.totalAsistenciaPersonal = [];
      this.servicioAsistenciaPersonal.busquedaPersonalEstadistica(this.busqueda_personal).subscribe(
        (res) => {
          var presente_personal = 'Presente';
          var ausente_personal = 'Ausente';
          var contadorpresente_personal = 0;
          var contadorausente_personal = 0;
          this.listadoAsistenciaPersonal = res;
          for (let f of this.listadoAsistenciaPersonal){
            if (moment(f.fecha_asistencia_personal).isBetween(
              this.fecha_inicio_personal,
              this.fecha_fin_personal
            )){
              if (f.estado == presente_personal){
                contadorpresente_personal++;
              }
              if (f.estado == ausente_personal){
                contadorausente_personal++;
              }
            }
          }
          this.totalAsistenciaPersonal.push(
            new Object ({ name: 'PRESENTE', value: contadorpresente_personal})
          );
          this.totalAsistenciaPersonal.push(
            new Object({ name: 'AUSENTE' , value: contadorausente_personal})
          );
          this.totalAsistenciaPersonal = [...this.totalAsistenciaPersonal]
          console.log(this.totalAsistenciaPersonal,"total asistencias personal")
        }
      )
    }
  }


  LimpiarFiltroAlumno(): void {
    this.fecha_inicio_alumno = new Date();
    this.fecha_fin_alumno = new Date();
  }
  LimpiarFiltroPersonal(): void {
    this.fecha_inicio_personal = new Date();
    this.fecha_fin_personal = new Date();
  }
}
