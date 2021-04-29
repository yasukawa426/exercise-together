import { Exercicio } from "./Exercicios/exercicio.model";

export interface Treino{
  nome: string;
  imagem: string;
  exercicios: Exercicio[]

}
