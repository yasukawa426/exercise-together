import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceAuth {
  private token: string;
  private autenticado: boolean = false;
  private authStatusSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  public isAutenticado(): boolean {
    return this.autenticado;
  }

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
        this.router.navigate(['/login']);
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
        if (this.token) {
          console.log(resposta);
          localStorage.setItem('emailLogado', email)
          this.autenticado = true;
          this.authStatusSubject.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.authStatusSubject.next(false);
    this.autenticado = false;
    localStorage.removeItem("emailLogado")
    this.router.navigate(['/']);
  }
}
