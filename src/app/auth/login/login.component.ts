import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioServiceAuth } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  onLogin(form:NgForm) {
    if(form.invalid) return;
    this.usuarioService.login(form.value.email, form.value.password);
  }


  constructor(private usuarioService: UsuarioServiceAuth) { }

  ngOnInit(): void {
  }

}
