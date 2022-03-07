import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cooperadora } from '../../entidades/cooperadora/cooperadora';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class CooperadoraService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';

  constructor( private http: HttpClient) { }

  getCooperadora(): Observable<Cooperadora[]>{
    return this.http.get<Cooperadora[]>(this.url + 'cooperadora', httpOption)
  }
  editarCooperadora(caja_chica : any, id:number): Observable<Cooperadora[]>{
    return this.http.put<Cooperadora[]>(this.url + 'cooperadora/' + id ,caja_chica ,httpOption)
  }
  agregarCooperadora(caja_chica : any, id:number): Observable<Cooperadora[]>{
    return this.http.put<Cooperadora[]>(this.url + 'cooperadora/agregar/' + id ,caja_chica ,httpOption)
  }
}
