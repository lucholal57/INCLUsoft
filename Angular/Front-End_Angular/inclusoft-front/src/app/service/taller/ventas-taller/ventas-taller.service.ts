import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentasTaller } from '../../../entidades/taller/ventas-taller/ventas-taller';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class VentasTallerService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/taller/ventas_taller/';

 // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

  // obtener ventas de taller
  getVentasTaller(): Observable<VentasTaller[]> {
    return this.http.get<VentasTaller[]>(this.url + 'listados');
  }
  // Registrar ventas del taller
  registrarVentasTaller(formularioRegistro: any): Observable<VentasTaller[]> {
    return this.http.post<VentasTaller[]>(this.url + 'registrar' , formularioRegistro, httpOption)
  }
  // Obtener material de taller pasando el ID
  getVentasTallerId(ventas : VentasTaller): Observable<VentasTaller[]> {
    return this.http.get<VentasTaller[]>(this.url + ventas.id)
  }
  // Editar ventas taller pasando el ID, el tipo de objetoy la constante de cabecera HttpHeaders
  editarVentasTallerId(formularioRegistro: any, id: number): Observable<VentasTaller[]> {
    return this.http.put<VentasTaller[]>(this.url + 'editar/' + id, formularioRegistro, httpOption);
  }
  // Eliminar ventas del taller
  eliminarVentasTaller(ventas : VentasTaller): Observable<VentasTaller[]> {
    return this.http.delete<VentasTaller[]>(this.url + 'eliminar/' + ventas.id)
  }
}
