const express = require ('express');
const cors = require("cors");
const app = express();
const mongoose = require ('mongoose');


app.use(cors());
app.use(express.json())

//pegando os endpoints
const treinoRoutes = require('./rotas/treino')



mongoose.connect ('mongodb+srv://x2_admin:x20123@clusterx2.2ajvc.mongodb.net/exerciseTogether?retryWrites=true&w=majority').then(() => {
  console.log ("Conexão OK")
}).catch((err) => {
  console.log(err)
  console.log("Conexão NOK")
});



//pra comçear a usar os endpoints
app.use('/api/treinos', treinoRoutes);

module.exports = app;
