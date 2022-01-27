import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AntecedenteMedico } from '../../../entidades/alumno/antecedente-medico/antecedente-medico';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class AntecedenteMedicoService {
// Variable para la url
  private url = 'http://127.0.0.1:8000/';

// Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

// Obtener Antecedentes medicos
getAntecedenteMedico(): Observable<AntecedenteMedico[]>{
  return this.http.get<AntecedenteMedico[]>(this.url + 'antecedente_medico', httpOption);
}
// Registrar Antecedentes medicos
registrarAntecedenteMedico(formularioRegistro: any): Observable<AntecedenteMedico[]>{
  return this.http.post<AntecedenteMedico[]>(this.url + 'antecedente_medico', formularioRegistro,httpOption);
}
// Obtener Antecedente Medico pasando el ID
getAntecedenteMedicoId(antecedente_medico: AntecedenteMedico): Observable<AntecedenteMedico[]>{
  return this.http.get<AntecedenteMedico[]>(this.url + 'antecedente_medico/' + antecedente_medico.id,httpOption);
}
// Editar Antecedente Medico pasando el ID y el tipo de objeto y la constante de cabecera HttpHeaders
editarAntecedenteMedicoId(formularioRegistro: any, id: number): Observable<AntecedenteMedico[]>{
  return this.http.put<AntecedenteMedico[]>(this.url + 'antecedente_medico/' + id, formularioRegistro,httpOption);
}
// Eliminar Antecedente Medico pasando el ID
elimnarAntecedenteMedico(antecedente_medico: AntecedenteMedico): Observable<AntecedenteMedico[]>{
  return this.http.delete<AntecedenteMedico[]>(this.url + 'antecedente_medico/' + antecedente_medico.id,httpOption);
}
// Busqueda de antecedente medico por alumno
busquedaAlumno(nombre:string): Observable<AntecedenteMedico[]>{
  return  this.http.get<AntecedenteMedico[]>(this.url + 'antecedente_medico/buscar/' + nombre,httpOption)
}
}
