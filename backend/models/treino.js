//importando o pacote
const mongoose = require ('mongoose');

//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const treinoSchema = mongoose.Schema ({
  nome: {type: String, required: true},
  imagem: {type: String, required: false, default: '00000000'},
  exercicios: {
    nome: {type: String, required: true},
    repeticao: {type: String, required: true},
    series: {type: String, required: true},
    imagem: {type: String, required: true},
    descricao: {type: String, required: true},
  }

});

//criamos o modelo associado ao nome Treino e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Cliente', treinoSchema);
