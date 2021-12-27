import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActaCompromiso } from '../../../entidades/alumno/acta-compromiso/acta-compromiso';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class ActaCompromisoService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/alumno/acta_compromiso/';

  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

  // Obtener actas compromiso
  getActaCompromiso(): Observable<ActaCompromiso[]>{
   return this.http.get<ActaCompromiso[]>(this.url + 'listados');
  }
  // Registrar Acta Compromiso
  registrarActaCompromiso(formularioRegistro: any): Observable<ActaCompromiso[]> {
    return this.http.post<ActaCompromiso[]>(this.url + 'registrar' , formularioRegistro , httpOption);
  }
  // Obtener Acta Compromiso pasando el ID
  getActaCompromisoId(acta_compromiso: ActaCompromiso): Observable<ActaCompromiso[]> {
    return this.http.get<ActaCompromiso[]>(this.url + acta_compromiso.id);
  }
  // Editar Acta Compromiso pasando el ID , el tipo de objeto y la constante de cabecera HttpHeaders
editarActaCompromisoId(formularioRegistro : any, id: number): Observable<ActaCompromiso[]>{
  return this.http.put<ActaCompromiso[]>(this.url + 'editar/' + id, formularioRegistro, httpOption);
}
  // Eliminar Acta Compromiso pasando el ID
eliminarActaCompromiso(acta_compromiso: ActaCompromiso): Observable<ActaCompromiso[]>{
  return this.http.delete<ActaCompromiso[]>(this.url + 'eliminar/' + acta_compromiso.id);
}
busquedaAlumno(nombre:string): Observable<ActaCompromiso[]>{
  return  this.http.get<ActaCompromiso[]>(this.url + 'buscar/nombre/' + nombre)
}

}
