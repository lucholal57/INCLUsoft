import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taller } from 'src/app/entidades/taller/taller/taller';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}


@Injectable({
  providedIn: 'root',
})
export class TallerService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';

  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) {}

  // Obtenemos los talleres
  getTalleres(): Observable<Taller[]> {
    return this.http.get<Taller[]>(this.url + 'taller',httpOption);
  }
  // Registrar Taller
  registrarTaller(formularioRegistro: any): Observable<Taller[]> {
    return this.http.post<Taller[]>(this.url + 'taller' , formularioRegistro, httpOption);
  }
  // Obtener talleres pasando el ID
  getTallerId(taller: Taller): Observable<Taller[]>{
    return this.http.get<Taller[]>(this.url + 'taller/' + taller.id,httpOption);
  }
  // Editar Taller pasando el ID , tipo de objeto y constante de cabecera HttpHeaders
  editarTallerId(formularioRegistro: any, id: number): Observable<Taller[]> {
    return this.http.put<Taller[]>(this.url + 'taller/' + id, formularioRegistro,httpOption);
  }
  // Eliminar Taller pasando el ID
  eliminarTaller(id: number): Observable<Taller[]>{
    return this.http.delete<Taller[]>(this.url + 'taller/' + id,httpOption);
  }

  // Buscar taller por nombre
  busquedaTaller(nombre: string): Observable<Taller[]>{
    return this.http.get<Taller[]>(this.url + 'taller/buscar/' + nombre,httpOption)
  }
}
