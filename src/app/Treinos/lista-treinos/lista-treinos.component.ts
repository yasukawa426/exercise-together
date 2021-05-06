import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercicio } from '../Exercicios/exercicio.model';
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
    localStorage.clear();
    localStorage.setItem('TreinoNome', nome);
    let numeroExercicios = 0;
    for (let i = 0; i < exercicios.length; i++) {
      let exercicio = exercicios[i];
      localStorage.setItem('nome' + (i + 1), exercicio.nome);
      localStorage.setItem('series' + (i + 1), exercicio.series);
      localStorage.setItem('repeticoes' + (i + 1), exercicio.repeticao);
      localStorage.setItem('imagem' + (i + 1), exercicio.imagem);
      localStorage.setItem('descricao' + (i + 1), exercicio.descricao);
      numeroExercicios += 1;
    }
    localStorage.setItem('numeroExercicios', numeroExercicios.toString());
  }

  //esse metodo só testa se ta adicionando no banco
  teste() {
    const treino: Treino = {
      nome: 'Treino dRoberto Calros',
      imagem:
        'https://www.olimpiadatododia.com.br/wp-content/uploads/2020/06/Michael-Phelps-recordista-de-medalhas-de-ouro-numa-u%CC%81nica-edic%CC%A7a%CC%83o-dos-Jogos-Oli%CC%81mpicos-Pequim-2008-1280x720.jpg',
      exercicios: [
        {
          nome: 'Flexao',
          repeticao: 2,
          series: 1,
          imagem:
            'https://image.shutterstock.com/shutterstock/photos/454190938/display_1500/stock-vector-step-instruction-for-push-up-of-woman-cartoon-illustration-about-work-out-454190938.jpg',
          descricao:
            'Abaixe o corpo de forma uniforme até que o peito fique a uma mão travessa do solo, sem lhe tocar e de seguida regresse a posição inicial',
        },
        {
          nome: 'Cambalhota',
          repeticao: 2,
          series: 1,
          imagem:
            'https://image.shutterstock.com/shutterstock/photos/454190938/display_1500/stock-vector-step-instruction-for-push-up-of-woman-cartoon-illustration-about-work-out-454190938.jpg',
          descricao:
            'Abaixe o corpo de forma uniforme até que o peito fique a uma mão travessa do solo, sem lhe tocar e de seguida regresse a posição inicial',
        },
      ],
    };

    this.treinoService.adicionarTreino(treino.nome, treino.imagem, treino.exercicios)
  }
  ngOnInit(): void {
    this.treinoService.getTreinos();
    //ta pegando a listaTreinosAtualizada como observable e se inscrevendo nela. Td vez q essa lista é atualizada (td vez q chega naquele .next()), atualiza a lista local q foi inicializada com o metodo .getTreinos()
    this.treinosSubscription = this.treinoService
      .getListaDeTreinosAtualizadaObservable()
      .subscribe((treinos: Treino[]) => {
        this.listaTreinos = treinos;
      });
  }

  ngOnDestroy(): void {
    //quando lista-treino é fechado, se desinscreve da listaAtuliaza para imperdir um vazamento de memoria
    this.treinosSubscription.unsubscribe();
  }
}
