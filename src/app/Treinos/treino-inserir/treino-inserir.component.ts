import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Exercicio } from '../Exercicios/exercicio.model';
import { TreinoService } from '../treino.service';
import { ExercicioService } from '../Exercicios/exercicio.service';
import { Subscription } from 'rxjs';
import { mimeTypeValidator } from './mime-type.validator';
@Component({
  selector: 'app-treino-inserir',
  templateUrl: './treino-inserir.component.html',
  styleUrls: ['./treino-inserir.component.css'],
})
export class TreinoInserirComponent implements OnInit, OnDestroy {

  //exercicios = new FormControl();
  //listaDeExercicios: string[] = ['Supino barra reto', 'Crucifixo halteres', 'Cross over', 'Flexão de braços'];
  listaDeExercicios: Exercicio[] = [];
  private exerciciosSubscription: Subscription
  nome: any;
  form: FormGroup;
  previewImagem: string;
  treinoService: any;

  constructor(public exercicioService: ExercicioService, treinoService: TreinoService) {}
  ngOnInit(): void {
    this.exercicioService.getExercicios();
    this.exerciciosSubscription = this.exercicioService.getListaDeTreinosAtualizadaObservable().subscribe((exercicios: Exercicio[]) => {
      this.listaDeExercicios = exercicios
    })
    console.log(this.listaDeExercicios);

    this.form = new FormGroup ({
      nome: new FormControl (null, {
        validators: [Validators.required]
      }),
      imagem: new FormControl (null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator]
      }),
      exercicios: new FormControl (null, {
        validators: [Validators.required]
      })
    })

  }

  ngOnDestroy(): void {
     //quando é fechado, se desinscreve da listaAtuliaza para imperdir um vazamento de memoria
     this.exerciciosSubscription.unsubscribe();
  }


  onAdicionarTreino() {
    this.treinoService.adicionarTreino = (
      this.form.value.nome,
      this.form.value.imagemURL,
      this.form.value.exercicios
    );

    this.form.reset();
  }

  onImagemSelecionada (event: Event) {
    const arquivo = (event.target as HTMLInputElement).files[0];
    this.form.patchValue ({'imagem': arquivo});
    this.form.get('imagem').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImagem = reader.result as string;
    }
    reader.readAsDataURL(arquivo);
  }
}
