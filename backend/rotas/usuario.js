//vai ser esponsavel por ter os endpoinst de usuario

const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");

//pega tds os usuarios
router.get("", (req, res, next) => {
  usuarios = Usuario.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo ok no get, toma seus usuarios",
      usuarios: documents,
    });
  });
});

//pega o usuario com esse email
router.get("/:email", (req, res, next) => {
  usuario = Usuario.findOne({ email: req.params.email }).then((documents) => {
    if (documents) {
      res.status(200).json(documents);
    } else {
      res.status(404).json({ mensagem: "Usuario n entcontoadod" });
    }
  });
});

//atualzia o peso do usuario com esse email
router.put("/:email/peso", (req, res, next) =>{
  console.log("Put recebido", req.body);
  usuario = Usuario.findOneAndUpdate({email: req.params.email }, {$push: {peso: {peso: req.body.peso, data: req.body.data}}}, {new: true}).then((documents) => {
    if (documents.peso === req.body.peso){
      res.status(201).json({mensagem:"Atualizado com sucesso", usuario: documents})
    }
    else{
      res.status(502).json({mensagem:"Não atualizado"})
    }
  })
});

//exportando
module.exports = router;
