import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercicio } from './Exercicios/exercicio.model';
import { Treino } from './treino.model';

@Injectable({providedIn: 'root'})
export class TreinoService {
  private treinos: Treino[] = [];
  private listaTreinosAtualizada = new Subject<Treino[]>();

  getTreinos(): Treino []{
    return [...this.treinos]
  }

  adicionarTreino(nome:string, imagem:string, exercicios: Exercicio[]){
    const treino: Treino = {
      nome:nome,
      imagem: imagem,
      exercicios: exercicios,
    };
    this.treinos.push(treino)
  }
}
