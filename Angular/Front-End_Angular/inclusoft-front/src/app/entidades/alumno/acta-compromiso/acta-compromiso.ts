import { Alumno } from '../../../entidades/alumno/alumno/alumno';
export class ActaCompromiso {
    id = 0;
    dias = '';
    ingreso = 0;
    salida = 0;
    traslado = '';
    personas_autorizadas_retiro = '';
    dni_persona_autorizada = '';
    alumno: Alumno = new Alumno();

}
