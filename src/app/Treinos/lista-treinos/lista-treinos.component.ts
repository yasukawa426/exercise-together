import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lista-treinos',
  templateUrl: './lista-treinos.component.html',
  styleUrls: ['./lista-treinos.component.css'],
})
export class ListaTreinosComponent implements OnInit {
  @Output() abrirTreino = new EventEmitter();
  constructor() {}

  listaTreinos: any = [
    {
      nome: 'Treino do Michael Felps',
      imagem: 'https://www.olimpiadatododia.com.br/wp-content/uploads/2020/06/Michael-Phelps-recordista-de-medalhas-de-ouro-numa-u%CC%81nica-edic%CC%A7a%CC%83o-dos-Jogos-Oli%CC%81mpicos-Pequim-2008-1280x720.jpg',
      exercicios: [
        {
          nome: 'flexao',
          repeticoes: 2,
          series: 1,
        },
        {
          nome: 'abdominal',
          repeticoes: 3,
          series: 2,
        },
      ],
    },
    {
      nome: 'Tanquinho em 20 dias',
      imagem: 'https://images-na.ssl-images-amazon.com/images/I/81PyTDtJlnL.png',
      exercicios: [
        {
          nome: 'Abdominal Obliquo',
          repeticoes: 12,
          series: 3,
        },
        {
          nome: 'Addominal Infra',
          repeticoes: 12,
          series: 3,
        },
      ],
    },
    {
      nome: 'Treino do Saitama',
      imagem: 'https://www.technofuss.com/wp-content/uploads/2021/02/One-Punch-Man.png',
      exercicios: [
        {
          nome: 'flexao',
          repeticoes: 100,
          series: 1,
        },
        {
          nome: 'abdominal',
          repeticoes: 100,
          series: 1,
        },
        {
          nome: 'agachamento',
          repeticoes: 100,
          series: 1,
        },
        {
          nome: 'corrida',
          repeticoes: 100,
          series:1
        }
      ],
    },
  ];

  // listaTreinos: any = [
  //   {
  //     nome: 'Treino do Michael Felps',
  //     exercicios: [{
  //       nome: 'flexao',
  //       repeticoes: 2,
  //       seris: 1
  //     },
  //     {
  //       nome: 'abdominal',
  //       repeticoes: 3,
  //       series: 2
  //     }
  //   ]

  //   },
  //   {
  //     nome: 'Tanquinho em 20 dias',
  //     exercicios: {
  //       flexao: {
  //         nome: 'Flexão',
  //         repeticoes: 5,
  //         series: 2,
  //       },
  //       agachamento: {
  //         nome: 'Agachamento',
  //         repeticoes: 3,
  //         series: 1,
  //       },
  //     },
  //   },
  //   {
  //     nome: 'Treino do Saitama',
  //     exercicios: {
  //       flexao: {
  //         nome: 'Flexão',
  //         repeticoes: 5,
  //         series: 2,
  //       },
  //       agachamento: {
  //         nome: 'Agachamento',
  //         repeticoes: 3,
  //         series: 1,
  //       },
  //     },
  //   },
  // ];
  treinar(nome: any, exercicios: any) {
    console.log(nome);
    console.log(exercicios);

    // const treino = {
    //   nome: nome,
    //   exercicios: exercicios

    // }
    //limpando o local storage antes de colocar
    localStorage.clear()
    localStorage.setItem('TreinoNome', nome)
    for(let i = 0; i < exercicios.length; i++ ){
      let exercicio = exercicios[i]
      localStorage.setItem("nome" + (i + 1), exercicio.nome)
      localStorage.setItem("series" + (i + 1), exercicio.series)
      localStorage.setItem("repeticoes" + (i + 1), exercicio.repeticoes)
    }

    //this.abrirTreino.emit(treino);
  }
  ngOnInit(): void {}
}
