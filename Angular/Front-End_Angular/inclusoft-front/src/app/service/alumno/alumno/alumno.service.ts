import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../../../entidades/alumno/alumno/alumno';


// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private url = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.url + 'alumno', httpOption);
  }

  registrarAlumno(formularioregistro: any): Observable<Alumno[]>{
    return this.http.post<Alumno[]>(this.url + 'alumno' , formularioregistro, httpOption);
  }


  getAlumnoId(busqueda_alumno: Alumno): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.url + 'alumno/' + busqueda_alumno.id,httpOption );
  }

  editarAlumno(formularioregistro: any, id: number): Observable<Alumno[]>{
    return this.http.put<Alumno[]>(this.url + 'alumno/' + id, formularioregistro, httpOption);

  }

  eliminarAlumno(id: number): Observable<Alumno[]>{
    return this.http.delete<Alumno[]>(this.url + 'alumno/' + id, httpOption );
  }

  busquedaAlumno(nombre:string): Observable<Alumno[]>{
    return  this.http.get<Alumno[]>(this.url + 'alumno/buscar/' + nombre, httpOption );
  }

}
