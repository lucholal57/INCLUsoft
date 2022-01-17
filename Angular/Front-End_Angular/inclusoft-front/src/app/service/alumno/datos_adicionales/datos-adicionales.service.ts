import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosAdicionales } from '../../../entidades/alumno/datos_adicionales/datos-adicionales';

// Constante para utilizar en los metodos PUT
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};

@Injectable({
  providedIn: 'root',
})
export class DatosAdicionalesService {
  // Variable publica para la ruta de la API
  private url = 'http://127.0.0.1:8000/';

  // Injectamos el servicio de http para utilizarlos en los metodos que se conecta con la API
  constructor(private http: HttpClient) {}

  // Obtener datos adicionales
  getDatosAdicionales(): Observable<DatosAdicionales[]> {
    return this.http.get<DatosAdicionales[]>(this.url + 'datos_adicionales');
  }
  // Registrar datos adicionales
  registrarDatosAdicionales(
    formularioRegistro: any
  ): Observable<DatosAdicionales[]> {
    return this.http.post<DatosAdicionales[]>(
      this.url + 'datos_adicionales',
    formularioRegistro,httpOption
    );
  }
  // Obtener datos adicionales pasando el ID
  getDatosAdicionalesId(
    datos_adicionales: DatosAdicionales
  ): Observable<DatosAdicionales[]> {
    return this.http.get<DatosAdicionales[]>(this.url + 'datos_adicionales/' + datos_adicionales.id);
  }
  // Editar datos adicionales pasando el ID y el tipo de objeto y la constante de la cabecera headers
  editarDatosAdicionales(formularioRegistro: any, id: number): Observable<DatosAdicionales[]>{
    return this.http.put<DatosAdicionales[]>(this.url + 'datos_adicionales/' + id, formularioRegistro, httpOption );
  }
  // Eliminar datos adicionales
  eliminarDatosAdicionales(datos_adicionales: DatosAdicionales): Observable<DatosAdicionales[]> {
    return this.http.delete<DatosAdicionales[]>(this.url + 'datos_adicionales/' + datos_adicionales.id);
  }

}
