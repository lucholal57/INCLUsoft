import { Injectable } from '@angular/core';
//importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../../../entidades/biblioteca/prestamo/prestamo';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')})
}

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
   // Variable para la url
   private url = 'http://127.0.0.1:8000/';

// Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

// Obtenemos todos los prestamos
getPrestamo(): Observable<Prestamo[]>{
  return this.http.get<Prestamo[]>(this.url + 'prestamo', httpOption)
}
// Registrar Prestamo
registrarPrestamo(formularioRegistro: any): Observable<Prestamo[]>{
  return this.http.post<Prestamo[]>(this.url + 'prestamo', formularioRegistro , httpOption)
}
// Obtener prestamo pasando el ID
getPrestamoId(prestamo : Prestamo): Observable<Prestamo[]>{
  return this.http.get<Prestamo[]>(this.url + 'prestamo/' + prestamo.id, httpOption)
}
// Editar prestamo pasanel pasando el ID, el tipo de objeto y la constante de cabeceras por el token.
editarPrestamoId(formularioRegistro: any, id : number): Observable<Prestamo[]>{
  return this.http.put<Prestamo[]>(this.url + 'prestamo/' + id , formularioRegistro,httpOption)
}
// Eliminar prestamos pasando el ID
eliminarPrestamo(prestamo : Prestamo): Observable<Prestamo[]>{
  return this.http.delete<Prestamo[]>(this.url + 'prestamo/' + prestamo.id, httpOption)
}
//Buscar prestamo por nombre de socio
busquedaSocio(nombre:string): Observable<Prestamo[]>{
  return this.http.get<Prestamo[]>(this.url + 'prestamo/buscar/' + nombre, httpOption)
}
}
