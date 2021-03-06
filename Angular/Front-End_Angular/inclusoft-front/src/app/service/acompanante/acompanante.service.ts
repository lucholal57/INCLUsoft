import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acompanante } from '../../entidades/acompanante/acompanante';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class AcompananteService {
   // Variable para la url
   private url = 'http://127.0.0.1:8000/';

  constructor( private http: HttpClient) { }

  // Obtener acompañanantes
  getAcompanante(): Observable<Acompanante[]> {
    return this.http.get<Acompanante[]>(this.url + 'acompañante', httpOption)
   }
  // Registrar acompañantes
  registrarAcompanantes(formularioregistro: any): Observable<Acompanante[]> {
    return this.http.post<Acompanante[]>(this.url + 'acompañante', formularioregistro, httpOption);
  }
  // Obtener acompañante en formulario reactivo y ventana modal para editar
  getAcompananteId(acompanante: Acompanante): Observable<Acompanante[]>{
    return this.http.get<Acompanante[]>(this.url + 'acompañante/' + acompanante.id, httpOption);
  }
  // Editar Acompañante
  editarAcompananteId(formularioRegistro : any, id:number): Observable<Acompanante[]>{
    return this.http.put<Acompanante[]>(this.url + 'acompañante/' + id, formularioRegistro, httpOption);
  }
  // Eliminar acompañante
  eliminarAcompanante(acompanante: Acompanante): Observable<Acompanante[]>{
    return this.http.delete<Acompanante[]>(this.url + 'acompañante/' + acompanante.id , httpOption);
  }
   // Busqueda por Alumnos
   busquedaAlumno(nombre:string): Observable<Acompanante[]>{
    return  this.http.get<Acompanante[]>(this.url + 'acompañante/buscar/alumno/' + nombre, httpOption)
  }
  // Busqueda por Personal
  busquedaPersonal(nombre:string): Observable<Acompanante[]>{
    return  this.http.get<Acompanante[]>(this.url + 'acompañante/buscar/personal/' + nombre, httpOption)
  }

}
