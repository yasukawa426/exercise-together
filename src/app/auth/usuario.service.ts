import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceAuth {
  private token: string;
  private authStatusSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {}

  public getToken(): string {
    return this.token;
  }

  public getStatusSubject() {
    return this.authStatusSubject.asObservable();
  }

  criarUsuario(email: string, senha: string, nome: string) {
    const authData: AuthData = {
      email: email,
      password: senha,
    };
    this.httpClient
      .post(`http://localhost:3000/api/usuarios/signup/${nome}`, authData)
      .subscribe((resposta) => {
        console.log(resposta);
      });
  }

  login(email: string, senha: string) {
    const authData: AuthData = {
      email: email,
      password: senha,
    };
    this.httpClient
      .post<{ token: string }>(
        'http://localhost:3000/api/usuarios/login',
        authData
      )
      .subscribe((resposta) => {
        this.token = resposta.token;
        console.log(resposta);
        this.authStatusSubject.next(true);
      });
  }
}
