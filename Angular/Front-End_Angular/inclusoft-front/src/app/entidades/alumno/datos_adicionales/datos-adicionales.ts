import { Alumno } from '../alumno/alumno';

export class DatosAdicionales {
    id: number;
    jubilacion: string;
    pension: string;
    cobertura_social: string;
    certificado_discapacidad: string;
    vigencia_certificado: Date; ;
    nivel_educacional: string;
    grupo_familiar_convivencia: string;
    actividades_realiza: string;
    trabajo_madre: string;
    trabajo_padre: string;
    telefono_madre: number;
    telefono_padre: number;
    alumno: Alumno;

}
