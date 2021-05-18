import { Treino } from "../Treinos/treino.model";

export interface Usuario{
  nome: string;
  email: string;
  peso: number[];
  treinos: Treino[];
}