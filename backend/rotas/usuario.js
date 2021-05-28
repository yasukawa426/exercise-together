//vai ser esponsavel por ter os endpoinst de usuario

const express = require("express");
const usuario = require("../models/usuario");
const router = express.Router();
const Usuario = require("../models/usuario");
const bcrypt = require('bcrypt');
const jwt = ('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

//pega tds os usuarios
router.get("", checkAuth, (req, res, next) => {
  usuarios = Usuario.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo ok no get, toma seus usuarios",
      usuarios: documents,
    });
  });
});

//pega o usuario com esse email
router.get("/:email", checkAuth, (req, res, next) => {
  let usuario = Usuario.findOne({ email: req.params.email }).then(
    (documents) => {
      if (documents) {
        res.status(200).json(documents);
      } else {
        res.status(404).json({ mensagem: "Usuario n entcontoadod" });
      }
    }
  );
});

//atualzia o peso do usuario com esse email
router.put("/:email/peso", checkAuth, (req, res, next) => {
  console.log("Put recebido", req.body);
  let usuario = Usuario.findOneAndUpdate(
    { email: req.params.email },
    { $push: { peso: { peso: req.body.peso, data: req.body.data } } },
    { new: true }
  ).then((documents) => {
    let ultimoPeso = documents.peso[documents.peso.length-1]
    console.log(ultimoPeso, req.body);
    if (ultimoPeso.peso == req.body.peso) {
      res
        .status(201)
        .json({ mensagem: "Atualizado com sucesso", usuario: documents });
    } else {
      res.status(502).json({ mensagem: "Não atualizado" });
    }
  });
});

// atualiza tds os atributos de usuario com esse email
router.put("/:email", checkAuth, (req, res, next) => {
  console.log("Put recebido", req.body);
  res
    .status(201)
    .json({ mensagem: "Atualizado com sucesso", usuario: usuario });
  usuario = Usuario.findOneAndUpdate({ email: req.params.email}, req.body).then((documents) => {
    res.status(201).json({mensagem:"Usuario atualizado com sucesso", usuario:documents})
  })
});

//Cadastro do usuario
router.post('/signup', (req, res, next) => {
  bcrypt.hash (req.body.password, 10)
  .then (hash => {
    const usuario = new Usuario ({
      email: req.body.email,
      password: req.body.password
    })
    usuario.save()
    .then(result => {
      res.status(201).json({
        mensagem: "Usuario criado",
        resultado: result
      });
    })
    .catch(err => {
      res.status(500).json({
        erro: err
      })
    })
  })
});

//Usuario fazendo login
router.post('/login', (req, res, next) => {
  let user;
  Usuario.findOne({ email: req.body.email }).then(u => {
    user = u;
    if(!u) {
      return res.status(401).json({
        mensagem: "email inválido"
      })
    }
    return bcrypt.compare(req.body.password, u.password);
  })
  .then(result => {
    if(!result) {
      return res.status(401).json({
        mensagem: "senha invalida"
      })
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      'minhasenha',
      { expiresIn: '1h' }
    )
    res.status(200).json({ token: token})
  })
  .catch(err => {
    return res.status(401).json({
      mensagem: "Login falhou:" + err
    })
  })
})

//exportando
module.exports = router;
