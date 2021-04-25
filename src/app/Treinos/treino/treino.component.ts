import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.component.html',
  styleUrls: ['./treino.component.css'],
})
export class TreinoComponent implements OnInit {
  @Input() treino = {};
  titulo: any = localStorage.getItem('TreinoNome');
  //vetor json com os exercicios
  exercicios = [{}];
  //variaveis do exercicio
  nome: any;
  repeticoes: any;
  series: any;
  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 30; i++) {
      this.nome = localStorage.getItem('nome' + (i + 1));
      // exercicio: any = localStorage.getItem("nome" + (i+1))
      if (this.nome != null) {
        this.nome = localStorage.getItem('nome' + (i + 1));
        this.repeticoes = localStorage.getItem('repeticoes' + (i + 1));
        this.series = localStorage.getItem('series' + (i + 1));

        //criando um json de exercicio com os valores do localStorage
        const exercicio = {
          nome: this.nome,
          repeticoes: this.repeticoes,
          series: this.series,
        };
        
        //adicionando os json no vetor exercicio
        this.exercicios.push(exercicio)

      }
    }
  }
}
