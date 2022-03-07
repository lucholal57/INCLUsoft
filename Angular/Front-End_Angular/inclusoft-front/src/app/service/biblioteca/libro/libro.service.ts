import { Injectable } from '@angular/core';
//importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../../../entidades/biblioteca/libro/libro';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')})
}

@Injectable({
  providedIn: 'root'
})
export class LibroService {
    // Variable para la url
    private url = 'http://127.0.0.1:8000/';


// Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

  //Obtenemos todos los libro
  getLibro(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.url + 'libro', httpOption);
  }
  //Obtenemos todos los libro
  getLibroActivo(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.url + 'libro_activo', httpOption);
  }
  //Registrar Libro
  registrarLibro(formularioRegistro: any): Observable<Libro[]>{
    return this.http.post<Libro[]>(this.url + 'libro', formularioRegistro, httpOption)
  }
  //Obtener Libro pasando el ID
  getLibroId(libro : Libro): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.url + 'libro/' + libro.id, httpOption)
  }
  //Editar Libro pasando el ID, el tipo de objeto y la constante de cabecera
  editarLibroId(formularioRegistro: any, id: number): Observable<Libro[]>{
    return this.http.put<Libro[]>(this.url + 'libro/' + id, formularioRegistro, httpOption)
  }
  //Eliminar Libro pasando el ID
  eliminarLibro(libro : Libro): Observable<Libro[]>{
    return this.http.delete<Libro[]>(this.url + 'libro/' + libro.id, httpOption)
  }
  //Busqueda de Libro por nombre
  busquedaLibro(nombre_libro : string): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.url + 'libro/buscar/' + nombre_libro, httpOption)
  }
 
}
