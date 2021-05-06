import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Treino } from '../treino.model';
import { FormControl } from '@angular/forms';
import { Exercicio } from '../Exercicios/exercicio.model';
import { ExercicioService } from '../Exercicios/exercicio.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-treino-inserir',
  templateUrl: './treino-inserir.component.html',
  styleUrls: ['./treino-inserir.component.css'],
})
export class TreinoInserirComponent implements OnInit, OnDestroy {
  @Output() treinoAdicionado = new EventEmitter<Treino>();

  exercicios = new FormControl();
  //listaDeExercicios: string[] = ['Supino barra reto', 'Crucifixo halteres', 'Cross over', 'Flexão de braços'];
  listaDeExercicios: Exercicio[] = [];
  private exerciciosSubscription: Subscription
  nome: any;

  constructor(public exercicioService: ExercicioService) {}
  ngOnInit(): void {
    this.exercicioService.getExercicios();
    this.exerciciosSubscription = this.exercicioService.getListaDeTreinosAtualizadaObservable().subscribe((exercicios: Exercicio[]) => {
      this.listaDeExercicios = exercicios
    })
    console.log(this.listaDeExercicios);
  }

  ngOnDestroy(): void {
     //quando é fechado, se desinscreve da listaAtuliaza para imperdir um vazamento de memoria
     this.exerciciosSubscription.unsubscribe();
  }


  onAdicionarTreino() {
    console.log('inserindo cliente...');
  }
}
