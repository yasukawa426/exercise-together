import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeletarDialogComponent, ListaTreinosComponent } from './Treinos/lista-treinos/lista-treinos.component';
import { TreinoComponent } from './Treinos/treino/treino.component';
import { DialogoDescricaoExercicioComponent } from './Treinos/Exercicios/dialogo-descricao-exercicio/dialogo-descricao-exercicio.component';
import { TreinoInserirComponent } from './Treinos/treino-inserir/treino-inserir.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TreinoService } from './Treinos/treino.service';
import { HttpClientModule } from '@angular/common/http';
import { ExercicioService } from './Treinos/Exercicios/exercicio.service';
import { ChartsModule } from 'ng2-charts';
import {
  BottomSheet,
  PerfilComponent,
} from './usuario/perfil/perfil.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PushNotificationsService } from 'ng-push'

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    ListaTreinosComponent,
    TreinoComponent,
    DialogoDescricaoExercicioComponent,
    TreinoInserirComponent,
    PerfilComponent,
    BottomSheet,
    DeletarDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    ChartsModule,
    FormsModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    // PushNotificationsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: true,
    //   // enabled: environment.production
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
  ],
  providers: [TreinoService, ExercicioService, PushNotificationsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
