import { Alumno } from '../alumno/alumno';

export class Asistencia {
    id: number;
    fecha_asistencia: Date;
    estado_asistencia: '';
    alumno: Alumno;
}
