import { Injectable } from '@angular/core';
// Importamos librerias necesarias httpclient httpheaders
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../../../entidades/personal/personal/personal';

// Constante de cabecera HttpHeaders
const httpOption = {headers: new HttpHeaders ({'content-type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
// Creamos variable con la ruta
  private url = 'http://127.0.0.1:8000/';

// Injectamos el servicio httpClient en el constructor para hacer las peticiones
  constructor(private http: HttpClient) { }

  getPersonal(): Observable<Personal[]>{
    return this.http.get<Personal[]>(this.url + 'personal');
  }

  registrarPersonal( formularioregistro: any): Observable<Personal[]>{
    return this.http.post<Personal[]>(this.url + 'personal', formularioregistro,httpOption);

  }

  getPersonalId(personal: Personal): Observable<Personal[]>{
    return this.http.get<Personal[]>(this.url + 'personal/' + personal.id);
  }

  editarPersonal(formularioRegistro: any, id: number): Observable<Personal[]>{
    console.log('mensaje servicio editar', formularioRegistro);
    return this.http.put<Personal[]>(this.url + 'personal/' + id, formularioRegistro);
  }

  eliminarPersonal(personal: Personal): Observable<Personal[]>{
    return this.http.delete<Personal[]>(this.url + 'personal/' + personal.id);
  }
}
