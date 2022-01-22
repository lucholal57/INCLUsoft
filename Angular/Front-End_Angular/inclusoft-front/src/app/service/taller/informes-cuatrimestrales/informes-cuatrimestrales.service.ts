import { Injectable } from '@angular/core';
// Importamos librerias
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InformesCuatrimestrales} from '../../../entidades/taller/informes-cuatrimestrales/informes-cuatrimestrales';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class InformesCuatrimestralesService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';

  // injectamos en el constructo r el servicio de HttpClient pára hacer las peticiones
  constructor(private http: HttpClient) { }

  //Obtenemos informes cuatrimestrales
  getInformesCuatrimestrales(): Observable<InformesCuatrimestrales[]> {
    return this.http.get<InformesCuatrimestrales[]>(this.url + 'informes_cuatrimestrales');
  }

  // Registrar informes cuatrimestrales
  registrarInformesCuatrimestrales(formularioRegistro: any): Observable<InformesCuatrimestrales[]> {
    return this.http.post<InformesCuatrimestrales[]>(this.url + 'informes_cuatrimestrales' , formularioRegistro, httpOption);
  }

  // Obtener informes cuatrimestrales pasando el ID
  getInformesCuatrimestralesId(informe_cuatrimestral: InformesCuatrimestrales): Observable<InformesCuatrimestrales[]> {
    return this.http.get<InformesCuatrimestrales[]>(this.url + 'informes_cuatrimestrales/' + informe_cuatrimestral.id);
  }

  // Editar informes cuatrimestrales pasando el ID, el tipo de objeto y la constante de cabecera HttpHeaders
  editarInformesCuatrimestralesId(formularioRegistro: any , id: number): Observable<InformesCuatrimestrales[]> {
    return this.http.put<InformesCuatrimestrales[]>(this.url + 'informes_cuatrimestrales/' + id, formularioRegistro)
  }

  // Eliminar informes cuatrimestrales
  eliminarInformesCuatrimestrales(informe_cuatrimestral: InformesCuatrimestrales): Observable<InformesCuatrimestrales[]> {
    return this.http.delete<InformesCuatrimestrales[]>(this.url + 'informes_cuatrimestrales/' + informe_cuatrimestral.id)
  }
  // Buscar taller por nombre
  busquedaTaller(nombre: string): Observable<InformesCuatrimestrales[]>{
    return this.http.get<InformesCuatrimestrales[]>(this.url + 'informes_cuatrimestrales/buscar/' + nombre)
  }


}
