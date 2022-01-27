import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  constructor(
    private servicioUsuario : UsuarioService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem("token")
    this.router.navigateByUrl('login')
  }


}
