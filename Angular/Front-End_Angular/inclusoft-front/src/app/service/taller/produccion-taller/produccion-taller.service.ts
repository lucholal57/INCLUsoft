import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProduccionTaller } from '../../../entidades/taller/produccion-taller/produccion-taller';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}


@Injectable({
  providedIn: 'root'
})
export class ProduccionTallerService {
// Variable para la url
  private url = 'http://127.0.0.1:8000/';

 // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

   // obtener Produccion de taller
   getProduccionTaller(): Observable<ProduccionTaller[]> {
    return this.http.get<ProduccionTaller[]>(this.url + 'produccion_taller',httpOption);
  }
  // Registrar Produccion del taller
  registrarProduccionTaller(formularioRegistro: any): Observable<ProduccionTaller[]> {
    return this.http.post<ProduccionTaller[]>(this.url + 'produccion_taller' , formularioRegistro, httpOption)
  }
  // Obtener material de taller pasando el ID
  getProduccionTallerId(produccion : ProduccionTaller): Observable<ProduccionTaller[]> {
    return this.http.get<ProduccionTaller[]>(this.url + 'produccion_taller/' + produccion.id,httpOption)
  }
  // Editar Produccion taller pasando el ID, el tipo de objetoy la constante de cabecera HttpHeaders
  editarProduccionTallerId(formularioRegistro: any, id: number): Observable<ProduccionTaller[]> {
    return this.http.put<ProduccionTaller[]>(this.url + 'produccion_taller/' + id, formularioRegistro,httpOption);
  }
  // Eliminar Produccion del taller
  eliminarProduccionTaller(produccion : ProduccionTaller): Observable<ProduccionTaller[]> {
    return this.http.delete<ProduccionTaller[]>(this.url + 'produccion_taller/' + produccion.id,httpOption)
  }
  // Buscar taller por nombre
  busquedaTaller(nombre: string): Observable<ProduccionTaller[]>{
    return this.http.get<ProduccionTaller[]>(this.url + 'produccion_taller/buscar/' + nombre,httpOption)
  }

}
