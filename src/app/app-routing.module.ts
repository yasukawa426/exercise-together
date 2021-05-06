import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTreinosComponent } from './Treinos/lista-treinos/lista-treinos.component';
import { TreinoComponent } from './Treinos/treino/treino.component';
import { TreinoInserirComponent } from './Treinos/treino-inserir/treino-inserir.component';

const routes: Routes = [
  {path: '', component: ListaTreinosComponent},
  {path: 'treino', component: TreinoComponent },
  {path: 'criar', component: TreinoInserirComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
