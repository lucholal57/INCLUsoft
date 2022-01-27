import { Injectable } from '@angular/core';
// Importamos librerias httpclient, httpheaders , observable y tambien la de entidad para las peticiones
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enfermeria } from '../../../entidades/alumno/enfermeria/enfermeria';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class EnfermeriaService {
// Variable para la url
private url = 'http://127.0.0.1:8000/';

// Injectamos en el constructor el servicio Httpcliente para hacer las peticiones
constructor(private http: HttpClient) { }

// Obtener Enfermeria
getEnfermeria(): Observable<Enfermeria[]> {
  return this.http.get<Enfermeria[]>(this.url + 'enfermeria',httpOption);
}
// Registrar Enfermeria
registrarEnfermeria(formularioRegistro: any): Observable<Enfermeria[]> {
  return this.http.post<Enfermeria[]>(this.url + 'enfermeria' , formularioRegistro, httpOption);
}
// Obtener Enfermeria pasando el ID
getEnfermeriaId( enfermeria: Enfermeria): Observable<Enfermeria[]> {
  return this.http.get<Enfermeria[]>(this.url + 'enfermeria/' +  enfermeria.id,httpOption);
}
// Editar enfermeria pasando el ID y el tipo de objeto y la constante de acbecera HttpHeaders
editarEnfermeriaId(enfermeria: Enfermeria, id : number): Observable<Enfermeria[]> {
  return this.http.put<Enfermeria[]>(this.url + 'enfermeria/' + id , enfermeria,httpOption);
}
// Eliminar Enfermeria pasando el ID
eliminarEnfermeria(enfermeria: Enfermeria): Observable<Enfermeria[]> {
  return this.http.delete<Enfermeria[]>(this.url + 'enfermeria/' + enfermeria.id,httpOption);
}
// Busqueda de alumno por asistencia
busquedaAlumno(nombre:string): Observable<Enfermeria[]>{
  return  this.http.get<Enfermeria[]>(this.url + 'enfermeria/buscar/' + nombre,httpOption)
}
}
