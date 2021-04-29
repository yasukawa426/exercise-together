import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TreinoComponent } from '../../treino/treino.component';

@Component({
  selector: 'app-dialogo-descricao-exercicio',
  templateUrl: './dialogo-descricao-exercicio.component.html',
  styleUrls: ['./dialogo-descricao-exercicio.component.css']
})
export class DialogoDescricaoExercicioComponent implements OnInit {
  //injetando a informação do treino.component.ts (no caso, a descrição)
  constructor(@Inject(MAT_DIALOG_DATA) public data: TreinoComponent) { }

  ngOnInit(): void {
  }

}
