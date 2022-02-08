import { Alumno } from'../../../entidades/alumno/alumno/alumno';
export class Socio {
  id= 0;
  fecha_de_inscripcion = new Date();
  alumno : Alumno = new Alumno();
}
