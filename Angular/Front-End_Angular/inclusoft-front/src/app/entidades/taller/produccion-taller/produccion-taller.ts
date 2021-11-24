import { Taller } from '../../../entidades/taller/taller/taller';
export class ProduccionTaller {
  id = 0;
  nombre_produccion = "";
  fecha_produccion = new Date();
  materiales = "";
  costo_venta = "";
  taller : Taller;
}
