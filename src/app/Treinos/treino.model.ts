import { Exercicio } from "./Exercicios/exercicio.model";

export interface Treino{
  nome: string;
  imagemURL: string;
  exercicios: Exercicio[]

}
