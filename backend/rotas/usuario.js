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
router.get("/:email", (req, res) => {
  usuarios = Usuario.findOne({ email: req.params.email }).then((documents) => {
    if (documents) {
      res.status(200).json(documents);
    } else {
      res.status(404).json({ mensagem: "Usuario n entcontoadod" });
    }
  });
});

//exportando
module.exports = router;
