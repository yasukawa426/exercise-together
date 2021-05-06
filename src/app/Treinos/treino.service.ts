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
    //avisa a quem ta inscrito q algo aconteceu. Assim os observadores podem reagir
    this.listaTreinosAtualizada.next([...this.treinos])
  }

  //os componentes interessados em obter uma cópia da lista toda vez q ela for atualizada utilizarão este método para obter o bojeto Observable e então se inscrevem nele (.subscribe() ao chamar esse metodo).
  getListaDeTreinosAtualizadaObservable(){
    return this.listaTreinosAtualizada.asObservable();
  }
}
