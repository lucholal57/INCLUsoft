import { Component, OnInit } from '@angular/core';
// Importamops las clases de entidades necesarias y servicios
import { Cooperadora } from '../../entidades/cooperadora/cooperadora';
import { CooperadoraService } from '../../service/cooperadora/cooperadora.service';

import { VentasTaller} from '../../entidades/taller/ventas-taller/ventas-taller';
import { VentasTallerService } from '../../service/taller/ventas-taller/ventas-taller.service';

import { CompraTaller } from 'src/app/entidades/taller/compra-taller/compra-taller';
import { CompraTallerService } from '../../service/taller/compra-taller/compra-taller.service';

import { AlertService } from '../../service/alert/alert.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-cooperadora',
  templateUrl: './cooperadora.component.html',
  styleUrls: ['./cooperadora.component.css']
})
export class CooperadoraComponent implements OnInit {
resultado : Cooperadora[];
caja_chica : number;
entradas : number;
salidas : number;
agregar: number;
//Array de produccion taller para poder sacar las gananacias e ir sumandolas para colocar en entrada de dinero
listadoVentasTaller : VentasTaller[];
listadoComprasTaller: CompraTaller[];
  constructor(
    private alertas : AlertService,
    private servicioCooperadora : CooperadoraService,
    private servicioVentasTaller : VentasTallerService,
    private servicioCompraTaller: CompraTallerService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.getCooperadora();
    this.getVentasTaller();
    this.getComprasTaller();
  }

  getCooperadora(): void {
    this.servicioCooperadora.getCooperadora().subscribe(
      (res) => {
        this.resultado= res
        this.resultado.forEach(a =>{
        this.caja_chica= a.caja_chica
        })
      },
      (error) => {
        this.alertas.alerterror();
      }
    )
  }
  agregarDineroCooperadora(): void {
    var objetocooperadora = new Object()
    var  resultado = 0;
    this.servicioCooperadora.getCooperadora().subscribe(
      (res) => {
        this.resultado= res
        this.resultado.forEach(a =>{
          resultado=(a.caja_chica + this.agregar)
        })
        objetocooperadora = { caja_chica : resultado}
        this.servicioCooperadora.editarCooperadora(objetocooperadora, 1).subscribe(
          (res) => {
            console.log(res)
            window.location.reload();
          },
          (error) => {
            console.log(error)
          }
          );

      },
      (error) => {
        this.alertas.alerterror();
      }
    )



  }
  // Obtenemos las producciones de taller
  getVentasTaller(): void {
  var resultado = 0
    this.servicioVentasTaller.getVentasTaller().subscribe(
      (res) => {
        this.listadoVentasTaller = res;
        this.listadoVentasTaller.forEach(a =>{
          resultado = (resultado + a.ganancia)

        })
        this.entradas = resultado
        console.log(this.entradas)
      },
      (error) => {
        console.log(error);
        this.alertas.alerterror();
      }
    );
  }
   // Obtenemnos compras de taller
   getComprasTaller(): void {
    var resultado = 0
    this.servicioCompraTaller.getCompraTaller().subscribe(
      (res) => {
        this.listadoComprasTaller = res;
        this.listadoComprasTaller.forEach(a =>{
          resultado = (resultado + a.total)
        })
        this.salidas = resultado
      },
      (error) => {
        this.alertas.alerterror();
      }
    );
  }

}
