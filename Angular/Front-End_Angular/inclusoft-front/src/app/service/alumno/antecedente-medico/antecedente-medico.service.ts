import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AntecedenteMedico } from '../../../entidades/alumno/antecedente-medico/antecedente-medico';

// Constante de los header para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class AntecedenteMedicoService {
// Variable para la url
  private url = 'http://127.0.0.1:8000/alumno/antecedente_medico/';

// Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http: HttpClient) { }

// Obtener Antecedentes medicos
getAntecedenteMedico(): Observable<AntecedenteMedico[]>{
  return this.http.get<AntecedenteMedico[]>(this.url + 'listados');
}
// Registrar Antecedentes medicos
registrarAntecedenteMedico(formularioRegistro: any): Observable<AntecedenteMedico[]>{
  return this.http.post<AntecedenteMedico[]>(this.url + 'registrar', formularioRegistro);
}
// Obtener Antecedente Medico pasando el ID
getAntecedenteMedicoId(antecedente_medico: AntecedenteMedico): Observable<AntecedenteMedico[]>{
  return this.http.get<AntecedenteMedico[]>(this.url + antecedente_medico.id);
}
// Editar Antecedente Medico pasando el ID y el tipo de objeto y la constante de cabecera HttpHeaders
editarAntecedenteMedicoId(formularioRegistro: any, id: number): Observable<AntecedenteMedico[]>{
  return this.http.put<AntecedenteMedico[]>(this.url + 'editar/' + id, formularioRegistro, httpOption);
}
// Eliminar Antecedente Medico pasando el ID
elimnarAntecedenteMedico(antecedente_medico: AntecedenteMedico): Observable<AntecedenteMedico[]>{
  return this.http.delete<AntecedenteMedico[]>(this.url + 'eliminar/' + antecedente_medico.id);
}
}
