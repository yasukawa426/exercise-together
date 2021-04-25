import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.component.html',
  styleUrls: ['./treino.component.css']
})
export class TreinoComponent implements OnInit {
@Input() treino = {};
  constructor() { }

  ngOnInit(): void {
  }

}
