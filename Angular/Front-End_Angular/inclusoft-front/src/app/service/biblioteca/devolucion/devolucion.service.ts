import { Injectable } from '@angular/core';
//importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devolucion } from '../../../entidades/biblioteca/devolucion/devolucion';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    Authorization: 'Token' + ' ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DevolucionService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';

  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) {}

  //Obtenemos todas las devolcuiones
  getDevolucion(): Observable<Devolucion[]> {
    return this.http.get<Devolucion[]>(this.url + 'devolucion', httpOption);
  }
  // Registrar Devolucion
  registrarDevolucion(formularioRegistro: any): Observable<Devolucion[]> {
    return this.http.post<Devolucion[]>(
      this.url + 'devolucion',
      formularioRegistro,
      httpOption
    );
  }
}
