import { Injectable } from '@angular/core';
// Importamos librerias httpclient, httpheaders , observable y tambien la de entidad para las peticiones
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enfermeria } from '../../../entidades/alumno/enfermeria/enfermeria';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EnfermeriaService {
// Variable para la url
private url = 'http://127.0.0.1:8000/alumno/enfermeria/';

// Injectamos en el constructor el servicio Httpcliente para hacer las peticiones
constructor(private http: HttpClient) { }

// Obtener Enfermeria
getEnfermeria(): Observable<Enfermeria[]> {
  return this.http.get<Enfermeria[]>(this.url + 'listados');
}
// Registrar Enfermeria
registrarEnfermeria(enfermeria: Enfermeria): Observable<Enfermeria[]> {
  return this.http.post<Enfermeria[]>(this.url + 'registrar' , enfermeria, httpOption);
}
// Obtener Enfermeria pasando el ID
getEnfermeriaId( enfermeria: Enfermeria): Observable<Enfermeria[]> {
  return this.http.get<Enfermeria[]>(this.url + enfermeria.id);
}
// Editar enfermeria pasando el ID y el tipo de objeto y la constante de acbecera HttpHeaders
editarEnfermeriaId(enfermeria: Enfermeria, id : number): Observable<Enfermeria[]> {
  return this.http.put<Enfermeria[]>(this.url + 'editar/' + id , enfermeria, httpOption);
}
// Eliminar Enfermeria pasando el ID
eliminarEnfermeria(enfermeria: Enfermeria): Observable<Enfermeria[]> {
  return this.http.delete<Enfermeria[]>(this.url + 'eliminar/' + enfermeria.id);
}
}
