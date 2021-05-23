const path = require('path');
const express = require ('express');
const cors = require("cors");
const app = express();
const mongoose = require ('mongoose');


app.use(cors());
app.use(express.json())

//pegando os endpoints
const treinoRoutes = require('./rotas/treino')
const exercicioRoutes = require ('./rotas/exercicio')
const usuarioRoutes = require('./rotas/usuario')


mongoose.connect ('mongodb+srv://x2_admin:x20123@clusterx2.2ajvc.mongodb.net/exerciseTogether?retryWrites=true&w=majority').then(() => {
  console.log ("Conexão OK")
}).catch((err) => {
  console.log(err)
  console.log("Conexão NOK")
});



//para ajustar o cabecalho da requisicao
/*app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "+");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(' Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');

  next();
})*/

//pra comçear a usar os endpoints
app.use('/api/treinos', treinoRoutes);
app.use('/api/exercicios', exercicioRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use("/imagens", express.static(path.join("backend/imagens")))

module.exports = app;
