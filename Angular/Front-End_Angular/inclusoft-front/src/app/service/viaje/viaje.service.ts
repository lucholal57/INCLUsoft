import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viaje } from '../../entidades/viaje/viaje';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  //Variable para la URL
  private url = 'http://127.0.0.1:8000/';

  constructor( private http: HttpClient) { }

  // Obtenemos los viajes
  getViaje(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.url + 'viajes');
  }
  // Regristrar Viaje
  registrarViaje(formularioregistro: any) : Observable<Viaje[]>{
    return this.http.post<Viaje[]>(this.url + 'viajes', formularioregistro, httpOption);
  }
  // Obtener viaje en formulario reactivo y ventana modal para poder editar
  getViajeId(viaje : Viaje) : Observable<Viaje[]>{
    return this.http.get<Viaje[]>(this.url + 'viajes/' + viaje.id);
  }
  // Editar viaje
  editarViajeId(formularioregistro : any, id: number) : Observable<Viaje[]> {
    return this.http.put<Viaje[]>(this.url + 'viajes/' + id , formularioregistro);
  }
  // Eliminar viaje
  eliminarViaje(viaje : Viaje) : Observable<Viaje[]> {
    return this.http.delete<Viaje[]>(this.url + 'viajes/' + viaje.id);
  }
   // Buscar viaje por destino
   busquedaDestino(destino : string): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.url + 'viajes/buscar/destino/' + destino);
  }

}
