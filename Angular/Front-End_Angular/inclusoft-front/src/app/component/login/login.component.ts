import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username = "";
  public password = "";

  constructor(
    private servicioUsuario : UsuarioService,
    private alertas : AlertService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const user =  {username:this.username, password:this.password}
    this.servicioUsuario.login(user).subscribe(
      (res) => {
        localStorage.setItem("token", res.token )
        this.router.navigateByUrl('inicio')
      },
      (error) => {
        this.alertas.alerteLogin()
      }
    )
  }

}
