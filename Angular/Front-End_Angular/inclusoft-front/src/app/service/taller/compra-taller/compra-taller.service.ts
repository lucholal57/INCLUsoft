import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompraTaller } from '../../../entidades/taller/compra-taller/compra-taller';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class CompraTallerService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/taller/compras_taller/';

  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor( private http: HttpClient) { }

  // obtener Compra de taller
  getCompraTaller(): Observable<CompraTaller[]> {
    return this.http.get<CompraTaller[]>(this.url + 'listados');
  }
  // Registrar Compra del taller
  registrarCompraTaller(formularioRegistro: any): Observable<CompraTaller[]> {
    return this.http.post<CompraTaller[]>(this.url + 'registrar' , formularioRegistro, httpOption)
  }
  // Obtener material de taller pasando el ID
  getCompraTallerId(compra : CompraTaller): Observable<CompraTaller[]> {
    return this.http.get<CompraTaller[]>(this.url + compra.id)
  }
  // Editar Compra taller pasando el ID, el tipo de objetoy la constante de cabecera HttpHeaders
  editarCompraTallerId(formularioRegistro: any, id: number): Observable<CompraTaller[]> {
    return this.http.put<CompraTaller[]>(this.url + 'editar/' + id, formularioRegistro, httpOption);
  }
  // Eliminar Compra del taller
  eliminarCompraTaller(compra : CompraTaller): Observable<CompraTaller[]> {
    return this.http.delete<CompraTaller[]>(this.url + 'eliminar/' + compra.id)
  }
}