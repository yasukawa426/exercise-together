import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercicio } from '../Exercicios/exercicio.model'
import { Treino } from '../treino.model';

@Component({
  selector: 'app-lista-treinos',
  templateUrl: './lista-treinos.component.html',
  styleUrls: ['./lista-treinos.component.css'],
})
export class ListaTreinosComponent implements OnInit {
  @Output() abrirTreino = new EventEmitter();
  constructor() {}

  //gif alternativo de flexao https://upload.wikimedia.org/wikipedia/commons/b/b8/Liegestuetz02_ani_fcm.gif
  listaTreinos: Treino[] = [
    {
      nome: 'Treino do Michael Felps',
      imagem: 'https://www.olimpiadatododia.com.br/wp-content/uploads/2020/06/Michael-Phelps-recordista-de-medalhas-de-ouro-numa-u%CC%81nica-edic%CC%A7a%CC%83o-dos-Jogos-Oli%CC%81mpicos-Pequim-2008-1280x720.jpg',
      exercicios: [
        {
          nome: 'Flexao',
          repeticao: 2,
          series: 1,
          imagem: "https://image.shutterstock.com/shutterstock/photos/454190938/display_1500/stock-vector-step-instruction-for-push-up-of-woman-cartoon-illustration-about-work-out-454190938.jpg",
          descricao: "Abaixe o corpo de forma uniforme até que o peito fique a uma mão travessa do solo, sem lhe tocar e de seguida regresse a posição inicial"
        },
        {
          nome: 'Abdominal',
          repeticao: 10,
          series: 1,
          imagem: "https://image.shutterstock.com/shutterstock/photos/715195228/display_1500/stock-vector-woman-who-was-fat-doing-sit-up-on-mat-illustration-about-correct-exercise-posture-715195228.jpg",
          descricao: "Com a força do abdômen, levante a parte superior do seu corpo até onde conseguir, sem necessidade de tentar encostar o peitoral nos joelhos. Não levante a lombar do chão" 
        }
      ],
    },
    {
      nome: 'Tanquinho em 20 dias',
      imagem: 'https://images-na.ssl-images-amazon.com/images/I/81PyTDtJlnL.png',
      exercicios: [
        {
          nome: 'Abdominal Oblíquo',
          repeticao: 12,
          series: 3,
          imagem: "https://image.shutterstock.com/shutterstock/photos/715195228/display_1500/stock-vector-woman-who-was-fat-doing-sit-up-on-mat-illustration-about-correct-exercise-posture-715195228.jpg",
          descricao: "Com a força do abdômen, levante a parte superior do seu corpo até onde conseguir, sem necessidade de tentar encostar o peitoral nos joelhos. Não levante a lombar do chão"
        },
        {
          nome: 'Abdominal Infra',
          repeticao: 12,
          series: 3,
          imagem: "https://image.shutterstock.com/shutterstock/photos/715195228/display_1500/stock-vector-woman-who-was-fat-doing-sit-up-on-mat-illustration-about-correct-exercise-posture-715195228.jpg",
          descricao: "Com a força do abdômen, levante a parte superior do seu corpo até onde conseguir, sem necessidade de tentar encostar o peitoral nos joelhos. Não levante a lombar do chão"
        },
      ],
    },
    {
      nome: 'Treino do Saitama',
      imagem: 'https://www.technofuss.com/wp-content/uploads/2021/02/One-Punch-Man.png',
      exercicios: [
        {
          nome: 'Flexao',
          repeticao: 2,
          series: 1,
          imagem: "https://image.shutterstock.com/shutterstock/photos/454190938/display_1500/stock-vector-step-instruction-for-push-up-of-woman-cartoon-illustration-about-work-out-454190938.jpg",
          descricao: "Abaixe o corpo de forma uniforme até que o peito fique a uma mão travessa do solo, sem lhe tocar e de seguida regresse a posição inicial"
        },
        {
          nome: 'Abdominal',
          repeticao: 10,
          series: 1,
          imagem: "https://image.shutterstock.com/shutterstock/photos/715195228/display_1500/stock-vector-woman-who-was-fat-doing-sit-up-on-mat-illustration-about-correct-exercise-posture-715195228.jpg",
          descricao: "Com a força do abdômen, levante a parte superior do seu corpo até onde conseguir, sem necessidade de tentar encostar o peitoral nos joelhos. Não levante a lombar do chão" 
        },
        {
          nome: 'Agachamento',
          repeticao: 100,
          series: 1,
          imagem: "https://image.shutterstock.com/shutterstock/photos/1303854643/display_1500/stock-vector-exercise-guide-by-woman-doing-air-squat-in-steps-in-side-view-illustration-about-workout-1303854643.jpg",
          descricao: "Abaixe os quadris a partir de uma posição em pé e depois se levante"
        },
        {
          nome: 'Corrida',
          repeticao: 100,
          series:1,
          imagem: "https://image.shutterstock.com/z/stock-vector-running-design-over-white-background-vector-illustration-272049824.jpg",
          descricao: "Corrida é quando só um pé está no chão e ao saltar os dois pés estão no ar"
        }
      ],
    },
  ];

  treinar(nome: any, exercicios: any) {
    console.log(nome);
    console.log(exercicios);

    //limpando o local storage antes de colocar
    localStorage.clear()
    localStorage.setItem('TreinoNome', nome)
    for(let i = 0; i < exercicios.length; i++ ){
      let exercicio = exercicios[i]
      localStorage.setItem("nome" + (i + 1), exercicio.nome)
      localStorage.setItem("series" + (i + 1), exercicio.series)
      localStorage.setItem("repeticoes" + (i + 1), exercicio.repeticao)
      localStorage.setItem("imagem" + (i + 1), exercicio.imagem)
      localStorage.setItem("descricao" + (i + 1), exercicio.descricao)
    }
  }
  ngOnInit(): void {}
}
