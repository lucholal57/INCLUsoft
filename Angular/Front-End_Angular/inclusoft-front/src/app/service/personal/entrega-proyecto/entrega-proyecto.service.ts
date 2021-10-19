import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntregaProyecto } from '../../../entidades/personal/entrega-proyecto/entrega-proyecto';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class EntregaProyectoService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/personal/entrega_proyecto/';
  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor( private http : HttpClient) { }

  // Obtener entrega proyecto
  getEntregaProyecto(): Observable<EntregaProyecto[]>{
    return this.http.get<EntregaProyecto[]>(this.url+ 'listados');
  }
  // Registrar entregas de proyecto
  registrarEntregaProyecto(formularioRegistro: any): Observable<EntregaProyecto[]>{
    return this.http.post<EntregaProyecto[]>(this.url+ 'registrar' , formularioRegistro );
  }
  // Obtener entregas proyectos pasando ID
  getEntregaProyectoId( entregaproyecto: EntregaProyecto): Observable<EntregaProyecto[]>{
    return this.http.get<EntregaProyecto[]>(this.url + entregaproyecto.id);
  }
  // Editar asistencias pasando el ID y el tipo de objeto y la constante de cabecera HttpHeaders
  editarEntregaProyectoId(formularioRegistro: any, id: number): Observable<EntregaProyecto[]>{
    return this.http.put<EntregaProyecto[]>(this.url + 'editar/' + id, formularioRegistro, httpOption);
  }
  //Eliminar Entrega proyecto
  eliminarEntregaProyecto( entregaproyecto: EntregaProyecto ): Observable<EntregaProyecto[]>{
    return this.http.delete<EntregaProyecto[]>(this.url + 'eliminar/' + entregaproyecto.id)
  }
}
