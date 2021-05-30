import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Exercicio } from '../Treinos/Exercicios/exercicio.model';
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

  //atualiza o peso do usuario com esse email
  atualizarPeso(email:string, peso:{peso:number, data:string}){
    this.httpClient.put<{mensagem: string, usuario: Usuario}>(`http://localhost:3000/api/usuarios/${email}/peso`,peso).subscribe((dados) =>{

    })
  }

  //atualiza td do usuario com esse email
  atualizarUsuario(email: string, usuario: Usuario){
    this.httpClient.put<{mensagem:string, usuario: Usuario}>(`http://localhost:3000/api/usuarios/${email}`, usuario).subscribe((dados) =>{

    })
  }

  //adiciona treino no usuario
  adicionarTreino(nome:string, imagem:File, exercicios: Exercicio[], email: string){
    /*const treino: Treino = {
      nome:nome,
      imagem: imagem,
      exercicios: exercicios,
    };*/
    const dadosTreino = new FormData();
    dadosTreino.append("nome", nome);
    dadosTreino.append('imagem', imagem);
    dadosTreino.append('exercicios', JSON.stringify(exercicios))
    console.log("Uma linha antes de fazer o post")
    this.httpClient.put<{mensagem: string, treino: Treino}>(`http://localhost:3000/api/usuarios/treino/${email}`, dadosTreino).subscribe((dados) => {
      console.log("Uma linha dps de fazer o post")
    })
    this.router.navigate(['/']);
  }
}
