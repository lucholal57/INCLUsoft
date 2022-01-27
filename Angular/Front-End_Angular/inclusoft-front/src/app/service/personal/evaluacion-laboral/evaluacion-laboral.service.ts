import { Injectable } from '@angular/core';
// Importamos Librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvaluacionLaboral } from 'src/app/entidades/personal/evaluacion-laboral/evaluacion-laboral';


// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}


@Injectable({
  providedIn: 'root'
})
export class EvaluacionLaboralService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';

  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor (private http: HttpClient) { }

  // Obtener Evaluaciones Laborales
  getEvaluacionLaboral(): Observable<EvaluacionLaboral[]>{
    return this.http.get<EvaluacionLaboral[]>(this.url + 'evaluacion_laboral',httpOption);
  }

 // Registras Evaluacion Laboral
registrarEvaluacionLaboral(formularioRegistro: any): Observable<EvaluacionLaboral[]> {
   return this.http.post<EvaluacionLaboral[]>(this.url + 'evaluacion_laboral', formularioRegistro, httpOption);
 }

 // Obtener Evaluaciones laborales pasando el ID
getEvaluacionesLaboralesId(evaluacioneslaborales: EvaluacionLaboral): Observable<EvaluacionLaboral[]> {
   return this.http.get<EvaluacionLaboral[]>(this.url + 'evaluacion_laboral/' +  evaluacioneslaborales.id,httpOption)
 }

 // Editar evaluaciones laborales pasando el ID y el tipo de objeto y la constante de cabecera HttpHeaders
editarEvaluacionLaboralId(formularioRegistro: any, id: number): Observable<EvaluacionLaboral[]> {
   return this.http.put<EvaluacionLaboral[]>(this.url + 'evaluacion_laboral/' + id, formularioRegistro,httpOption);
 }

 // Eliminar evaluaciones laborales
elimarEvaluacionLaboral( evaluacionlaboral : EvaluacionLaboral): Observable<EvaluacionLaboral[]>{
   return this.http.delete<EvaluacionLaboral[]>(this.url + 'evaluacion_laboral/' + evaluacionlaboral.id,httpOption);
 }
  // Busqueda de personal por asistencia
  busquedaPersonal(nombre:string): Observable<EvaluacionLaboral[]>{
  return  this.http.get<EvaluacionLaboral[]>(this.url + 'evaluacion_laboral/buscar/' + nombre,httpOption)
}
}
