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
  private url = 'http://127.0.0.1:8000/';

  // Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

  // Obtener actas compromiso
  getActaCompromiso(): Observable<ActaCompromiso[]>{
   return this.http.get<ActaCompromiso[]>(this.url + 'acta_compromiso');
  }
  // Registrar Acta Compromiso
  registrarActaCompromiso(formularioRegistro: any): Observable<ActaCompromiso[]> {
    return this.http.post<ActaCompromiso[]>(this.url + 'acta_compromiso' , formularioRegistro , httpOption);
  }
  // Obtener Acta Compromiso pasando el ID
  getActaCompromisoId(acta_compromiso: ActaCompromiso): Observable<ActaCompromiso[]> {
    return this.http.get<ActaCompromiso[]>(this.url + 'acta_compromiso/' + acta_compromiso.id);
  }
  // Editar Acta Compromiso pasando el ID , el tipo de objeto y la constante de cabecera HttpHeaders
editarActaCompromisoId(formularioRegistro : any, id: number): Observable<ActaCompromiso[]>{
  return this.http.put<ActaCompromiso[]>(this.url + 'acta_compromiso/' + id, formularioRegistro, httpOption);
}
  // Eliminar Acta Compromiso pasando el ID
eliminarActaCompromiso(acta_compromiso: ActaCompromiso): Observable<ActaCompromiso[]>{
  return this.http.delete<ActaCompromiso[]>(this.url + 'acta_compromiso/' + acta_compromiso.id);
}
// Busqueda de alumno por asistencia
busquedaAlumno(nombre:string): Observable<ActaCompromiso[]>{
  return  this.http.get<ActaCompromiso[]>(this.url + 'acta_compromiso/buscar/' + nombre)
}

}
