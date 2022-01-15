import { Component, OnInit } from '@angular/core';
import { Alumno } from'../../entidades/alumno/alumno/alumno';
import { AlumnoService } from '../../service/alumno/alumno/alumno.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  listadoAlumnos: Alumno[];

  view: [number,number] = [700, 400];


  colorScheme = {
    domain: ['red', 'pink']
  };



  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;


  constructor(
    private servicioAlumno: AlumnoService,
  ) {}


  onSelect(data: Alumno): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }
    // Obtener todo los alumnos para listar
getAlumno(): void{
  this.servicioAlumno.getAlumnos().subscribe(
    (res) => {
      this.listadoAlumnos = res;
    },
    (error) => {
    }
  );
}


}
