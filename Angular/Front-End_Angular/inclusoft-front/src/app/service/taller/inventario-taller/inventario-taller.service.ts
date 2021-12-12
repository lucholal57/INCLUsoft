import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventarioTaller } from '../../../entidades/taller/inventario-taller/inventario-taller';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};


@Injectable({
  providedIn: 'root'
})
export class InventarioTallerService {
    // Variable para la url
    private url = 'http://127.0.0.1:8000/taller/inventario_taller/';


    // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor( private http: HttpClient) { }
 // obtener Inventario de taller
 getInventarioTaller(): Observable<InventarioTaller[]> {
  return this.http.get<InventarioTaller[]>(this.url + 'listados');
}
// Registrar Inventario del taller
registrarInventarioTaller(formularioRegistro: any): Observable<InventarioTaller[]> {
  return this.http.post<InventarioTaller[]>(this.url + 'registrar' , formularioRegistro, httpOption)
}
// Obtener material de taller pasando el ID
getInventarioTallerId(Inventario : InventarioTaller): Observable<InventarioTaller[]> {
  return this.http.get<InventarioTaller[]>(this.url + Inventario.id)
}
// Editar Inventario taller pasando el ID, el tipo de objetoy la constante de cabecera HttpHeaders
editarInventarioTallerId(formularioRegistro: any, id: number): Observable<InventarioTaller[]> {
  return this.http.put<InventarioTaller[]>(this.url + 'editar/' + id, formularioRegistro, httpOption);
}
// Eliminar Inventario del taller
eliminarInventarioTaller(Inventario : InventarioTaller): Observable<InventarioTaller[]> {
  return this.http.delete<InventarioTaller[]>(this.url + 'eliminar/' + Inventario.id)
}



}
