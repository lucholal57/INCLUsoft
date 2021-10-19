import { Injectable } from '@angular/core';
// Importamos librerias necesarias httpclient httpheaders
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../../../entidades/personal/personal/personal';
import { FormBuilder } from '@angular/forms';

// Constante de cabecera HttpHeaders
const httpOption = {headers: new HttpHeaders ({'content-type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
// Creamos variable con la ruta
  private url = 'http://127.0.0.1:8000/personal/';

// Injectamos el servicio httpClient en el constructor para hacer las peticiones
  constructor(private http: HttpClient) { }

  getPersonal(): Observable<Personal[]>{
    return this.http.get<Personal[]>(this.url + 'listados');
  }

  registrarPersonal( formularioregistro: any): Observable<Personal[]>{
    return this.http.post<Personal[]>(this.url + 'registrar', formularioregistro);

  }

  getPersonalId(personal: Personal): Observable<Personal[]>{
    return this.http.get<Personal[]>(this.url + personal.id);
  }

  editarPersonal(formularioRegistro: any, id: number): Observable<Personal[]>{
    console.log('mensaje servicio editar', formularioRegistro);
    return this.http.put<Personal[]>(this.url + 'editar/' + id, formularioRegistro, httpOption);
  }

  eliminarPersonal(personal: Personal): Observable<Personal[]>{
    return this.http.delete<Personal[]>(this.url + 'eliminar/' + personal.id);
  }
}
