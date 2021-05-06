//vai ser responsavel por ter os endpoinst envolvendo treino
const express = require("express");
const router = express.Router();
const Treino = require("../models/treino");


//pega tds os treinos da tabela treino endpoint : localhost:3000/api/treinos
router.get("", (req, res, next) => {
  treinos = Treino.find().then(documents => {
    res.status(200).json({
      mensagem:"Tudo ok no get, toma os treinos",
      treinos: documents
    })
    //isso printa tds os exercicios do terceiro treino (treino do saitama)
    // treinos = documents
    // for(let i = 0; i < treinos[1].exercicios.length; i++){
    //   console.log(treinos[2].exercicios[i]);
    // }
  })
})

router.post("", (req, res, next) =>{
  body = req.body
  
  const treino = new Treino({
    nome:body.nome,
    imagem:body.imagem,
    exercicios:body.exercicios,
  })
  //salva no banco
  treino.save()
  console.log(treino);
  res.status(201).json({mensagem: "Booooa, recebi seu treino e inseri no banco", treino: treino})
})




//exportando
module.exports = router;
