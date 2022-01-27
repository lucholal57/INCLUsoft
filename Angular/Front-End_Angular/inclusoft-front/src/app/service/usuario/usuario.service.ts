import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/account/';

  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(
    private http: HttpClient,
    ) { }

  login(user:any): Observable<any> {
    return this.http.post(this.url + 'login/' , user)
  }
  logout(user:any): Observable<any> {
    return this.http.post(this.url + 'logout/' , user)
  }

}
