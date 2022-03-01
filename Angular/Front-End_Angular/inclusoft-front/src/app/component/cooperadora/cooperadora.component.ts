import { Component, OnInit } from '@angular/core';
// Importamops las clases de entidades necesarias y servicios
import { Cooperadora } from '../../entidades/cooperadora/cooperadora';
import { CooperadoraService } from '../../service/cooperadora/cooperadora.service';

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
  constructor(
    private alertas : AlertService,
    private servicioCooperadora : CooperadoraService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.getCooperadora();
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

}
