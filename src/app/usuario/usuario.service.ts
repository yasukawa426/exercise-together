import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Treino } from '../Treinos/treino.model';
import { Usuario } from './usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private Usuarios: Usuario[] = [];
  constructor(private httpClient: HttpClient, private router: Router) {}

  // getUsuarios(): {

  // }

  //pega o usuario q tem esse email especifico.
  getUsuarioEmail(email: string) {
    return this.httpClient.get<{
      peso: {peso:number, data:string}[];
      treinos: Treino [];
      _id: string;
      nome: string;
      email: string;
    }>(`http://localhost:3000/api/usuarios/${email}`);
  }
}
