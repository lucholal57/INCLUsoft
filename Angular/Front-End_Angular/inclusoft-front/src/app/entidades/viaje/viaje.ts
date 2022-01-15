import { Alumno} from "../../entidades/alumno/alumno/alumno";
import { Personal} from  "../../entidades/personal/personal/personal";

export class Viaje {
  id = 0;
  destino = "";
  fecha_viaje = new Date();
  gastos = 0;
  personal : Personal[];
  alumno: Alumno[];
}
