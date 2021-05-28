//vai ser responsavel por ter os endpoinst envolvendo exercicio
const express = require("express");
const router = express.Router();
const Exercicio = require("../models/exercicio");
const checkAuth = require('../middleware/check-auth');

//pega tds os exercicios da tabela exercicio endpoint : localhost:3000/api/exercicios
router.get("", (req, res, next) => {
  exercicios = Exercicio.find().then(documents => {
    res.status(200).json({
      mensagem:"Tudo ok no get, toma os exercicios",
      exercicios: documents
    })
  })
})

//repiticao e series não são necessarias pq a gente vai querer colocar no banco com o valor 0 msm, só vamos mudar esse valor quando for usar pra criar um treino.
//Esse metodo adiciona um exercicio no banco, provavelmnete só vai ser usado por adms
router.post("", checkAuth, (req, res, next) =>{
  body = req.body

  const exercicio = new Exercicio({
    nome:body.nome,
    imagem:body.imagem,
    descricao: body.descricao,
  })
  //salva no banco
  exercicio.save()
  console.log(exercicio);
  res.status(201).json({mensagem: "Booooa, recebi seu exercicio e inseri no banco", exercicio: exercicio})
})




//exportando
module.exports = router;
