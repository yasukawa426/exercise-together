import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { Exercicio } from '../Exercicios/exercicio.model';
import { DialogoDescricaoExercicioComponent } from '../Exercicios/dialogo-descricao-exercicio/dialogo-descricao-exercicio.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.component.html',
  styleUrls: ['./treino.component.css'],
})
export class TreinoComponent implements OnInit {
  @Input() treino = {};
  titulo: any = localStorage.getItem('TreinoNome');
  //vetor json com os exercicios
  exercicios: Exercicio[] = [];
  //variaveis do exercicio
  nome: any;
  repeticoes: any;
  series: any;
  imagem: any;
  descricao: any;
  //qual tab a gente ta
  tabAtual = 0;
  constructor(public dialog: MatDialog, public router: Router) {}

  ngOnInit(): void {
    let numeroExercicios: any= localStorage.getItem('numeroExercicios');
    numeroExercicios = parseInt(numeroExercicios)

    for (let i = 0; i < numeroExercicios; i++) {

      //n precisa mais checar se o nome é null agr q sabe quantos exercicios tem
      // if (this.nome != null) {
      // }
      this.nome = localStorage.getItem('nome' + (i + 1));
      // exercicio: any = localStorage.getItem("nome" + (i+1))
      this.nome = localStorage.getItem('nome' + (i + 1));
      this.repeticoes = localStorage.getItem('repeticoes' + (i + 1));
      this.series = localStorage.getItem('series' + (i + 1));
      this.imagem = localStorage.getItem('imagem' + (i + 1));
      this.descricao = localStorage.getItem('descricao' + (i + 1));

      //criando um json de exercicio com os valores do localStorage
      const exercicio: Exercicio = {
        nome: this.nome,
        repeticao: this.repeticoes,
        series: this.series,
        imagem: this.imagem,
        descricao: this.descricao
      };

      //adicionando os json no vetor exercicio
      this.exercicios.push(exercicio)

    }
  }
  //executado quando clicar em "?"
  abrirDescricao(descricao:any){
    //abre o component ../Exercicios/DialogDescricaoExercicioComponent injetando o dado descricao
    this.dialog.open(DialogoDescricaoExercicioComponent, {
      data:{
        descricao: descricao
      }
    })
  }

  mudouTab(event){
    console.log(this.tabAtual);
    console.log(event);
    this.tabAtual = event;
  }
  proximo(){
    if (this.tabAtual < this.exercicios.length - 1){
      this.tabAtual += 1
    }
    else{
      alert("CONCLUIDO!")
      this.router.navigate([""]);
    }
  }
}
