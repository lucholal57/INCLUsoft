import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// Importamos entidades para poder hacer las busquedas
import { Acompanante } from '../../entidades/acompanante/acompanante';
import { Viaje } from '../../entidades/viaje/viaje';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';


  constructor(private http: HttpClient) { }

   // Busqueda por Alumnos
   busquedaAlumno(nombre:string): Observable<Acompanante[]>{
    return  this.http.get<Acompanante[]>(this.url + 'acompañante/buscar/alumno/' + nombre)
  }
  // Busqueda por Personal
  busquedaPersonal(nombre:string): Observable<Acompanante[]>{
    return  this.http.get<Acompanante[]>(this.url + 'acompañante/buscar/personal/' + nombre)
  }
  // Buscar viaje por destino
  busquedaDestino(destino : string): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.url + 'viajes/buscar/destino' + destino);
  }

  }

