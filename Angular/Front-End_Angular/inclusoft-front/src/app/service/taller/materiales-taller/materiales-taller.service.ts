import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialesTaller } from '../../../entidades/taller/materiales-taller/materiales-taller';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}


@Injectable({
  providedIn: 'root'
})
export class MaterialesTallerService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';

  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

  // obtener materiales de taller
  getMaterialesTaller(): Observable<MaterialesTaller[]> {
    return this.http.get<MaterialesTaller[]>(this.url + 'materiales_taller',httpOption);
  }
  // Registrar materiales del taller
  registrarMaterialesTaller(formularioRegistro: any): Observable<MaterialesTaller[]> {
    return this.http.post<MaterialesTaller[]>(this.url + 'materiales_taller' , formularioRegistro, httpOption)
  }
  // Obtener material de taller pasando el ID
  getMaterialesTallerId(materiales : MaterialesTaller): Observable<MaterialesTaller[]> {
    return this.http.get<MaterialesTaller[]>(this.url + 'materiales_taller/' + materiales.id,httpOption)
  }
  // Editar materiales taller pasando el ID, el tipo de objetoy la constante de cabecera HttpHeaders
  editarMaterialesTallerId(formularioRegistro: any, id: number): Observable<MaterialesTaller[]> {
    return this.http.put<MaterialesTaller[]>(this.url + 'materiales_taller/' + id, formularioRegistro,httpOption);
  }
  // Eliminar materiales del taller
  eliminarMaterialesTaller(materiales : MaterialesTaller): Observable<MaterialesTaller[]> {
    return this.http.delete<MaterialesTaller[]>(this.url + 'materiales_taller/' + materiales.id,httpOption)
  }
   // Buscar taller por nombre
   busquedaTaller(nombre: string): Observable<MaterialesTaller[]>{
    return this.http.get<MaterialesTaller[]>(this.url + 'materiales_taller/buscar/' + nombre,httpOption)
  }


}
