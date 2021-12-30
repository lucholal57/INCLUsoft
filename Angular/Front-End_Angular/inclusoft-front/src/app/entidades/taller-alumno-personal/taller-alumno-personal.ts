import { Alumno } from "../alumno/alumno/alumno";
import { Personal } from "../personal/personal/personal";
import { Taller } from "../taller/taller/taller";

export class TallerAlumnoPersonal {
  id= 0;
  taller = Taller;
  personal = Personal;
  alumno = Alumno;
}
