import { Injectable } from '@angular/core';
// Importamos libreriras
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patologia } from '../../../entidades/alumno/patologia/patologia';
import { Asistencia } from 'src/app/entidades/alumno/asistencia/asistencia';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
};

@Injectable({
  providedIn: 'root'
})
export class PatologiaService {
// VAriable para la url
private url = 'http://127.0.0.1:8000/';

// Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

// Obtener Patologias
getPatologias(): Observable<Patologia[]> {
  return this.http.get<Patologia[]> (this.url + 'patologia',httpOption);
}
// Registrar patologias
registrarPatologia(formularioRegistro: any): Observable<Patologia[]> {
  return this.http.post<Patologia[]> (
    this.url + 'patologia', formularioRegistro, httpOption);
}
// Obtener patologias pasando el ID
getPatologiasId(patologia: Patologia): Observable<Patologia[]>{
  return this.http.get<Patologia[]> (this.url + 'patologia/' + patologia.id,httpOption);
}
// Editar patologias pasando el ID y el tipo de objeto y la constante de cabecera HttpHeaders
editarPtologiasId(patologia: Patologia, id: number): Observable<Patologia[]>{
  return this.http.put<Patologia[]>(this.url + 'patologia/' + id, patologia, httpOption);
}
// Eliminar Patologia pasando el ID
eliminarPatologia(patologia: Patologia): Observable<Patologia[]>{
  return this.http.delete<Patologia[]>(this.url + 'patologia/' + patologia.id,httpOption);
}
// Busqueda de alumno por asistencia
busquedaAlumno(nombre:string): Observable<Patologia[]>{
  return  this.http.get<Patologia[]>(this.url + 'patologia/buscar/' + nombre,httpOption)
}
busquedaPatologia(nombre_patologia:string): Observable<Patologia[]>{
  return this.http.get<Patologia[]>(this.url + 'alumno/buscar/patologia/'+ nombre_patologia, httpOption );
}

}
