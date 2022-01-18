import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaPersonal } from '../../../entidades/personal/asistencia-personal/asistencia-personal';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class AsistenciaPersonalService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';

  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) {}

  // Obtener Asistencias Personal
  getAsistenciaPersonal(): Observable<AsistenciaPersonal[]> {
    return this.http.get<AsistenciaPersonal[]>(this.url + 'asistencia_personal');
  }

  // Registrar asistencias personal
  registrarAsistenciaPersonal(formularioRegistro : any):
  Observable<AsistenciaPersonal[]> {
    return this.http.post<AsistenciaPersonal[]>(this.url + 'asistencia_personal', formularioRegistro,httpOption);
  }

  // Obtener Asistencia pasando ID
  getAsistenciaPersonalId( asistenciapersonal: AsistenciaPersonal): Observable<AsistenciaPersonal[]>{
    return this.http.get<AsistenciaPersonal[]>(this.url + 'asistencia_personal/' + asistenciapersonal.id);
  }

  // Editar asistencia del personal pasando el ID y el tipo de objeto, y constande de cabecera HttpHeaders
  editarAsistenciaPersonalId(formularioRegistro : any, id : number): Observable<AsistenciaPersonal[]>{
    return this.http.put<AsistenciaPersonal[]>(this.url + 'asistencia_personal/' +id , formularioRegistro);
  }

  // Eliminar asistencia personal
  eliminarAsistenciaPersonal( asistenciapersonal: AsistenciaPersonal):Observable<AsistenciaPersonal[]> {
    return this.http.delete<AsistenciaPersonal[]>(this.url + 'asistencia_personal/' + asistenciapersonal.id);
  }
  // Busqueda de personal por asistencia
busquedaPersonal(nombre:string): Observable<AsistenciaPersonal[]>{
  return  this.http.get<AsistenciaPersonal[]>(this.url + 'asistencia_personal/buscar/' + nombre)
}
}
