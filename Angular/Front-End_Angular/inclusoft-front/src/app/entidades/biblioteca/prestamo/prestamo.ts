import { Socio } from '../../../entidades/biblioteca/socio/socio';
import { Libro } from '../../../entidades/biblioteca/libro/libro';
export class Prestamo {
  id= 0;
  fecha_de_prestamo = new Date();
  libro : Libro[];
  socio : Socio = new Socio();
  estado = "";
  fecha_de_devolucion = new Date();

}
