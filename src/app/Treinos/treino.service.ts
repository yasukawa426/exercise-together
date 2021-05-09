import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercicio } from './Exercicios/exercicio.model';
import { Treino } from './treino.model';
import { HttpClient } from '@angular/common/http'

@Injectable({providedIn: 'root'})
export class TreinoService {
  private treinos: Treino[] = [];
  private listaTreinosAtualizada = new Subject<Treino[]>();

  constructor (private httpClient: HttpClient){

  }

  getTreinos(): void{
    this.httpClient.get<{mensagem: string, treinos: Treino[]}>('http://localhost:3000/api/treinos').subscribe((dados) =>{
      this.treinos = dados.treinos;
      this.listaTreinosAtualizada.next([...this.treinos]);
    })
  }

  adicionarTreino(nome:string, imagem:File, exercicios: Exercicio[]){
    /*const treino: Treino = {
      nome:nome,
      imagem: imagem,
      exercicios: exercicios,
    };*/
    const dadosTreino = new FormData();
    dadosTreino.append("nome", nome);
    dadosTreino.append('imagem', imagem);
    dadosTreino.append('exercicios', exercicios)

    this.httpClient.post<{mensagem: string, treino: Treino}>('http://localhost:3000/api/treinos', dadosTreino).subscribe((dados) => {
      const treino: Treino = {
        nome: nome,
        imagemURL: dados.treino.imagemURL,
        exercicios: exercicios
      }
      this.treinos.push(treino)
      //avisa a quem ta inscrito q algo aconteceu. Assim os observadores podem reagir
    this.listaTreinosAtualizada.next([...this.treinos])
    })
  }

  //os componentes interessados em obter uma cópia da lista toda vez q ela for atualizada utilizarão este método para obter o bojeto Observable e então se inscrevem nele (.subscribe() ao chamar esse metodo).
  getListaDeTreinosAtualizadaObservable(){
    return this.listaTreinosAtualizada.asObservable();
  }
}
