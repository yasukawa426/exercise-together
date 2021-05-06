import { Component, EventEmitter, Output } from '@angular/core';
import { Treino } from '../treino.model';
import { FormControl} from '@angular/forms';

@Component({
selector: 'app-treino-inserir',
templateUrl: './treino-inserir.component.html',
styleUrls: ['./treino-inserir.component.css'],
})

export class TreinoInserirComponent {
  nome: any;

  @Output() treinoAdicionado = new EventEmitter <Treino>();

  exercicios = new FormControl();
  listaDeExercicios: string[] = ['Supino barra reto', 'Crucifixo halteres', 'Cross over', 'Flexão de braços'];

  onAdicionarTreino() {
    console.log ('inserindo cliente...');
  }
}

