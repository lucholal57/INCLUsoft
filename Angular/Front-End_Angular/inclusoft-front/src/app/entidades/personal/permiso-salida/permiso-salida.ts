import { Personal } from '../personal/personal';
export class PermisoSalida {
    id = 0;
    fecha_permiso = new Date();
    motivo = "";
    horario_salida = 0;
    horario_regreso = 0;
    personal : Personal;
   
}
