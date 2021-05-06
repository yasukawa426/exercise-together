//importando o pacote
const mongoose = require ('mongoose');

//definindo o "schema"
//repiticao e series não são necessarias pq a gente vai querer colocar no banco com o valor 0 msm, só vamos mudar esse valor quando for usar pra criar um treino
const exercicioSchema = mongoose.Schema ({
  nome: {type: String, required: true},
  imagem: {type: String, required: true},
  repeticao: {type: String, required: false, default: '0'},
  series: {type: String, required: false, default: '0'},
  descricao: {type: String, required: true},
});


//criamos o modelo associado ao nome Exercicio e exportamos
module.exports = mongoose.model('Exercicio', exercicioSchema);
