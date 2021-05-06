import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercicio } from './exercicio.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ExercicioService {
  private exercicios: Exercicio[] = [];
  private listaExerciciosAtualizada = new Subject<Exercicio[]>();

  constructor(private httpClient: HttpClient) {}
  //esse metodo pega tds os exercicios do banco de dados e ent atualiza a lista local com eles dps retorna ela
  getExercicios(): void{
    this.httpClient
      .get<{ mensagem: string; exercicios: Exercicio[] }>(
        'http://localhost:3000/api/exercicios'
      )
      .subscribe((dados) => {
        this.exercicios = dados.exercicios;
        this.listaExerciciosAtualizada.next([...this.exercicios])
      });
  }

  //esse metodo cria um novo exercicios no banco de dados. Provavelmente só vai ser utilizado por adms
  //repiticao e series não são necessarias pq a gente vai querer colocar no banco com o valor 0 msm, só vamos mudar esse valor quando for usar pra criar um treino.
  adicionarExercicio(nome: string, imagem: string, descricao: string) {
    const exercicio: Exercicio = {
      nome: nome,
      imagem: imagem,
      descricao: descricao,
      repeticao: '0',
      series: '0'
    };
    this.httpClient
      .post<{ mensagem: string }>('http://localhost:3000/api/exercicios', exercicio)
      .subscribe((dados) => {
        this.exercicios.push(exercicio);
        //avisa a quem ta inscrito q algo aconteceu. Assim os observadores podem reagir
        this.listaExerciciosAtualizada.next([...this.exercicios]);
      });
  }

  //os componentes interessados em obter uma cópia da lista toda vez q ela for atualizada utilizarão este método para obter o bojeto Observable e então se inscrevem nele (.subscribe() ao chamar esse metodo).
  getListaDeTreinosAtualizadaObservable(){
    return this.listaExerciciosAtualizada.asObservable();
  }


}
