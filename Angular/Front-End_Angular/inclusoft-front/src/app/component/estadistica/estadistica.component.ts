import { Component, OnInit } from '@angular/core';
import { Alumno } from'../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../service/alumno/alumno/alumno.service';
import { Personal } from'../../entidades/personal/personal/personal';
import { PersonalService } from '../../service/personal/personal/personal.service';
import {Prestamo} from'../../entidades/biblioteca/prestamo/prestamo';
import { PrestamoService } from '../../service/biblioteca/prestamo/prestamo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  listadoAlumnos: Alumno[];
  listadoPersonal: Personal[];
  listadoPrestamo : Prestamo[];
  total = new Array();
  totalprestamo = new Array();

  view: [number,number] = [500, 400];

  colorScheme = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FFFF06' , '#FF0606']
  };
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;


  constructor(
    private servicioAlumno: AlumnoService,
    private servicioPersonal: PersonalService,
    private servicioPrestamo: PrestamoService

  ) {}

  ngOnInit(): void {
    this.servicioPersonal.getPersonal().subscribe(
      (res) => {
        this.listadoPersonal= res;
        this.total.push(new Object({name : "Personal", value: this.listadoPersonal.length}))
        console.log(this.total,"length personal")
        //Formula para poder guardar los datos de los graficos
        this.total = [...this.total];
      }
    );
    this.servicioAlumno.getAlumnos().subscribe(
      (res) => {
          this.listadoAlumnos= res
          this.total.push(new Object({name : "Alumno", value: this.listadoAlumnos.length}))
          console.log(this.total,"length alumno")
          //Formula para poder guardar los datos de los graficos
          this.total = [...this.total];
      }
    );

  }


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  dato = [
    {
        "name": "Personal",
        "value": 6
    },
    {
        "name": "Alumno",
        "value": 5
    }
]


gettotales() {


}

verdatos(): void {
  console.log(this.total,"length")
  console.log(this.dato)
}
}
