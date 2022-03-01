import { Taller } from '../../../entidades/taller/taller/taller';
export class CompraTaller {
  id = 0;
  insumos = "";
  observaciones_compra = "";
  fecha_compra =  new Date();
  cantidad = 0;
  precio = 0;
  total = 0;
  taller: Taller;
}
