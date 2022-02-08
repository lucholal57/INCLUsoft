import { Injectable } from '@angular/core';
//importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socio } from '../../../entidades/biblioteca/socio/socio';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')})
}

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';

// Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

  //Obtenemos todos los socios
  getSocio(): Observable<Socio[]>{
    return this.http.get<Socio[]>(this.url + 'socio', httpOption);
  }
  // Registrar Socios
  registrarSocio(formularioRegistro: any): Observable<Socio[]>{
    return this.http.post<Socio[]>(this.url + 'socio', formularioRegistro, httpOption)
  }
  // Obtener Socio pasando el ID
  getSocioId(socio : Socio): Observable<Socio[]>{
    return this.http.get<Socio[]>(this.url + 'socio/' + socio.id, httpOption )
  }
  // Editar socio pasando el ID, el tipo de objeto y la constante de cabecera httpoption
  editarSocioId(formularioRegistro: any, id: number): Observable<Socio[]>{
    return this.http.put<Socio[]>(this.url + 'socio/' + id, formularioRegistro,httpOption)
  }
  // Eliminar socio pasando el ID
  eliminarSocio(socio:Socio): Observable<Socio[]>{
    return this.http.delete<Socio[]>(this.url + 'socio/' + socio.id, httpOption)
  }

  // Busqueda de alumno por asistencia
busquedaAlumno(nombre:string): Observable<Socio[]>{
  return  this.http.get<Socio[]>(this.url + 'socio/buscar/' + nombre,httpOption )
}
}
