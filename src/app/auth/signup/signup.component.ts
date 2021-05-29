import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioServiceAuth } from '../usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  onSignup(form: NgForm) {
    if(form.invalid) return;
    this.usuarioService.criarUsuario(form.value.email, form.value.password, form.value.nome);
  }

  constructor(private usuarioService: UsuarioServiceAuth) { }

  ngOnInit(): void {
  }

}
