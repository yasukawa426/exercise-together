import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private token: string;
  public getToken(): string {
    return this.token;
  }

  constructor(private httpClient: HttpClient) {

  }
  criarUsuario(email: string, senha: string, nome: string) {
    const authData: AuthData = {
      email: email,
      password: senha,
    }
    this.httpClient.post(`http://localhost:3000/api/usuarios/signup/${nome}`, authData)
    .subscribe(resposta => {
      console.log(resposta)
    });
  }

  login(email: string, senha: string) {
    const authData: AuthData = {
      email: email,
      password: senha
    }
    this.httpClient.post <{ token: string}> ("http://localhost:3000/api/usuarios/login", authData)
    .subscribe(resposta => {
      this.token = resposta.token;
    });
  }
}
