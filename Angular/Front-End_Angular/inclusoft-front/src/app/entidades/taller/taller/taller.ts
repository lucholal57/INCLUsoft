import { Alumno } from "../../alumno/alumno/alumno";
import { Personal } from "../../personal/personal/personal";

export class Taller {
    id = 0;
    nombre_taller = "";
    observaciones = "";
    dias = "";
    horarios = 0;
    personal : Personal[];
    alumno : Alumno[];
}
