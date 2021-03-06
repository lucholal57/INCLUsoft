import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PermisoSalida } from '../../../entidades/personal/permiso-salida/permiso-salida';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}


@Injectable({
  providedIn: 'root'
})
export class PermisoSalidaService {
  //variable para la URL|
  private url = "http://127.0.0.1:8000/";

  //Injectamos en el constructor el servicio de HttpClient para hacer las peticiones
  constructor(private http : HttpClient) { }

  // Obtener permisos de salida
  getPermisoSalida(): Observable<PermisoSalida[]> {
    return this.http.get<PermisoSalida[]>(this.url + 'permiso_salida',httpOption);
  }
  // Registrar permisos de salida
  registrarPermisoSalida(formularioRegistro: any): Observable<PermisoSalida[]> {
    return this.http.post<PermisoSalida[]>(this.url + 'permiso_salida' , formularioRegistro , httpOption)
  }
  //Obtener permisos de salida pasando el ID
  getPermisoSalidaId(permisosalida : PermisoSalida): Observable<PermisoSalida[]> {
    return this.http.get<PermisoSalida[]>(this.url + 'permiso_salida/' +  permisosalida.id,httpOption)
  }
  // Editar permisos de salida pasando el ID y el tipo de objeto con la constante de cabecera HttpHeaders
  editarPermisoSalidaId(formularioRegistro : any, id: number): Observable<PermisoSalida[]> {
    return this.http.put<PermisoSalida[]>(this.url + 'permiso_salida/' + id , formularioRegistro,httpOption );
  }
  // Eliminar permisos de salida
  eliminarPermisoSalida( permisosalida : PermisoSalida): Observable<PermisoSalida[]> {
    return this.http.delete<PermisoSalida[]>(this.url + 'permiso_salida/' + permisosalida.id,httpOption);
  }
    // Busqueda de personal por permiso de salida
busquedaPersonal(nombre:string): Observable<PermisoSalida[]>{
  return  this.http.get<PermisoSalida[]>(this.url + 'permiso_salida/buscar/' + nombre,httpOption)
}
}
