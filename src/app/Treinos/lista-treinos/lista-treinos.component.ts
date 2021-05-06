import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercicio } from '../Exercicios/exercicio.model'
import { Treino } from '../treino.model';
import { TreinoService } from '../treino.service';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-lista-treinos',
  templateUrl: './lista-treinos.component.html',
  styleUrls: ['./lista-treinos.component.css'],
})
export class ListaTreinosComponent implements OnInit, OnDestroy {

  constructor(public treinoService: TreinoService) {}


  listaTreinos: Treino[] = [];
  private treinosSubscription: Subscription;
  //gif alternativo de flexao https://upload.wikimedia.org/wikipedia/commons/b/b8/Liegestuetz02_ani_fcm.gif

  

  treinar(nome: any, exercicios: any) {
    console.log(nome);
    console.log(exercicios);

    //limpando o local storage antes de colocar
    localStorage.clear()
    localStorage.setItem('TreinoNome', nome)
    let numeroExercicios = 0;
    for(let i = 0; i < exercicios.length; i++ ){
      let exercicio = exercicios[i]
      localStorage.setItem("nome" + (i + 1), exercicio.nome)
      localStorage.setItem("series" + (i + 1), exercicio.series)
      localStorage.setItem("repeticoes" + (i + 1), exercicio.repeticao)
      localStorage.setItem("imagem" + (i + 1), exercicio.imagem)
      localStorage.setItem("descricao" + (i + 1), exercicio.descricao)
      numeroExercicios += 1
    }
    localStorage.setItem("numeroExercicios", numeroExercicios.toString())
  }
  ngOnInit(): void {

    this.treinoService.getTreinos();
    //ta pegando a listaTreinosAtualizada como observable e se inscrevendo nela. Td vez q essa lista é atualizada (td vez q chega naquele .next()), atualiza a lista local q foi inicializada com o metodo .getTreinos()
    this.treinosSubscription = this.treinoService.getListaDeTreinosAtualizadaObservable().subscribe((treinos: Treino[]) => {
      this.listaTreinos = treinos;
    })
  }

  ngOnDestroy(): void {
    //quando lista-treino é fechado, se desinscreve da listaAtuliaza para imperdir um vazamento de memoria
    this.treinosSubscription.unsubscribe();
  }
}
