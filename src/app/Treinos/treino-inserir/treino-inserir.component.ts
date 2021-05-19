import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Exercicio } from '../Exercicios/exercicio.model';
import { TreinoService } from '../treino.service';
import { ExercicioService } from '../Exercicios/exercicio.service';
import { Subscription } from 'rxjs';
import { mimeTypeValidator } from './mime-type.validator';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-treino-inserir',
  templateUrl: './treino-inserir.component.html',
  styleUrls: ['./treino-inserir.component.css'],
})
export class TreinoInserirComponent implements OnInit, OnDestroy {
  //exercicios = new FormControl();
  //listaDeExercicios: string[] = ['Supino barra reto', 'Crucifixo halteres', 'Cross over', 'Flexão de braços'];
  listaDeExercicios: Exercicio[] = [];
  private exerciciosSubscription: Subscription;
  nome: any;
  form: FormGroup;
  previewImagem: string;
  exercicioSelecionado: Exercicio[] = null;

  constructor(
    public exercicioService: ExercicioService,
    public treinoService: TreinoService
  ) {}
  ngOnInit(): void {
    this.exercicioService.getExercicios();
    this.exerciciosSubscription = this.exercicioService
      .getListaDeTreinosAtualizadaObservable()
      .subscribe((exercicios: Exercicio[]) => {
        this.listaDeExercicios = exercicios;
      });
    console.log(this.listaDeExercicios);

    this.form = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required],
      }),
      imagem: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator],
      }),
      exercicios: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  ngOnDestroy(): void {
    //quando é fechado, se desinscreve da listaAtuliaza para imperdir um vazamento de memoria
    this.exerciciosSubscription.unsubscribe();
  }

  onAdicionarTreino() {
    console.log('Nome: ', this.form.value.nome);
    console.log('Imagem: ', this.form.value.imagem);
    console.log('Exercicios: ', this.form.value.exercicios);
    console.log('Selecionados: ', this.exercicioSelecionado);

    this.treinoService.adicionarTreino(
      this.form.value.nome,
      this.form.value.imagem,
      this.form.value.exercicios
    );

    this.form.reset();
  }

  onImagemSelecionada(event: Event) {
    const arquivo = (event.target as HTMLInputElement).files[0];
    //valida a imagem e coloca no form
    this.form.patchValue({ imagem: arquivo });
    this.form.get('imagem').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImagem = reader.result as string;
    };
    reader.readAsDataURL(arquivo);
  }

  //executa tds vez q um exercicio é escolhido no mat-select
  escolhido(event: MatSelectChange) {
    console.log('Event.value', event.value); //
    this.exercicioSelecionado = event.value;

    console.log('Form de Exercicios: ', this.form.value.exercicios);
  }
}
