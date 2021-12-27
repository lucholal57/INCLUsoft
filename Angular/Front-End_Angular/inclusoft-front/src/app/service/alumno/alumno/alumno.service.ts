import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../../../entidades/alumno/alumno/alumno';

const httpOption = {headers: new HttpHeaders ({'content-type': ' application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private url = 'http://127.0.0.1:8000/alumno/'

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.url + 'listados');
  }

  registrarAlumno(formularioregistro: any): Observable<Alumno[]>{
    return this.http.post<Alumno[]>(this.url + 'registrar' , formularioregistro);
  }


  getAlumnoId(busqueda_alumno: Alumno): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.url + busqueda_alumno.id);
  }

  editarAlumno(formularioregistro: any, id: number): Observable<Alumno[]>{
    return this.http.put<Alumno[]>(this.url + 'editar/' + id, formularioregistro, httpOption);

  }

  eliminarAlumno(id: number): Observable<Alumno[]>{
    return this.http.delete<Alumno[]>(this.url + 'eliminar/' + id);
  }

  busquedaAlumno(nombre:string): Observable<Alumno[]>{
    return  this.http.get<Alumno[]>(this.url + 'buscar/nombre/' + nombre)
  }
}
