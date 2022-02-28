import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia } from '../../../entidades/alumno/asistencia/asistencia';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
// Variable para la url
  private url = 'http://127.0.0.1:8000/';

// Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) {}

// Obtener Asistencias
  getAsistencias(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.url + 'asistencia',httpOption);
  }
// Registrar Asisitencias
  registrarAsistencias(formularioRegistro: any): Observable<Asistencia[]> {
    return this.http.post<Asistencia[]>(
      this.url + 'asistencia', formularioRegistro,httpOption
    );
  }
// Obtener asistencias pasando el ID
  getAsistenciasId(asistencia: Asistencia): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.url + 'asistencia/' + asistencia.id,httpOption);
  }
// Editar asistencias pasando el ID y el tipo de objeto y la constante de cabecera HttpHeaders
editarAsistenciasId(formularioRegistro: any, id: number): Observable<Asistencia[]> {
  return this.http.put<Asistencia[]>(this.url + 'asistencia/' + id, formularioRegistro,httpOption);
}
// Eliminar asistencia pasando el ID
eliminarAsistencia(asistencia: Asistencia): Observable<Asistencia[]> {
  return this.http.delete<Asistencia[]>(this.url + 'asistencia/' + asistencia.id,httpOption);
}
// Busqueda de alumno por asistencia
busquedaAlumno(nombre:string): Observable<Asistencia[]>{
  return  this.http.get<Asistencia[]>(this.url + 'asistencia/buscar/' + nombre,httpOption)
}
// Busqueda de alumno por asistencia
busquedaAlumnoEstadistica(id:number): Observable<Asistencia[]>{
  return  this.http.get<Asistencia[]>(this.url + 'asistencia/buscar/filtro/' + id,httpOption)
}
}
