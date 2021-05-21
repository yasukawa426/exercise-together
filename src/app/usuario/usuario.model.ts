import { Treino } from "../Treinos/treino.model";

export interface Usuario{
  nome: string;
  email: string;
  peso: {peso: number, data:string}[];
  treinos: Treino[];
}