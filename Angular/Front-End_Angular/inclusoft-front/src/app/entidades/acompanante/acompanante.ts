import { Alumno} from "../../entidades/alumno/alumno/alumno";
import { Personal} from  "../../entidades/personal/personal/personal";

export class Acompanante {
  id = 0;
  observaciones_acompanante = "";
  alumno: Alumno;
  personal: Personal;

}
