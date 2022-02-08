import { Socio } from '../../../entidades/biblioteca/socio/socio';
import { Libro } from '../../../entidades/biblioteca/libro/libro';
export class Prestamo {
  id= 0;
  fecha_prestamo = new Date();
  libro : Libro[];
  socio : Socio = new Socio();

}
