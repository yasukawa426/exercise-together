//vai ser esponsavel por ter os endpoinst de usuario

const express = require("express");
const usuario = require("../models/usuario");
const Email = require("../models/email");
const router = express.Router();
const Usuario = require("../models/usuario");
//faz criptografia
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");
//envia emails
const nodemailer = require("nodemailer");
//agenda tarefas
const cron = require("node-cron");

const armazenamento = multer.diskStorage({
  //requisiçao, arquivo extraido e uma funçao que indica um erro ou devolve o diretorio que as //fotos vao ficar
  destination: (req, file, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype]
      ? null
      : new Error("Mime Type Inválido");
    callback(e, "backend/imagens");
  },
  filename: (req, file, callback) => {
    const nome = file.originalname.toLowerCase().split(" ").join("_");
    const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
    callback(null, `${nome}-${Date.now()}.${extensao}`);
  },
});

const MIME_TYPE_EXTENSAO_MAPA = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/bmp": "bmp",
};

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

//adiciona um treino ao usuario
router.put(
  "/treino/:email",
  checkAuth,
  multer({ storage: armazenamento }).single("imagem"),
  (req, res, next) => {
    const imagemURL = `${req.protocol}://${req.get("host")}`;
    vetorExercicios = JSON.parse(req.body.exercicios);
    const treino = {
      nome: req.body.nome,
      imagemURL: `${imagemURL}/imagens/${req.file.filename}`,
      exercicios: vetorExercicios,
    };

    let usuario = Usuario.findOneAndUpdate(
      {
        email: req.params.email,
      },
      {
        $push: {
          treinos: {
            nome: treino.nome,
            imagemURL: treino.imagemURL,
            exercicios: treino.exercicios,
          },
        },
      },
      { new: true }
    ).then((documents) => {
      res.status(201).json({ mensagem: "Treino add", usuario: documents });
    });
  }
);

//atualzia o peso do usuario com esse email
router.put("/:email/peso", checkAuth, (req, res, next) => {
  console.log("Put recebido", req.body);
  let usuario = Usuario.findOneAndUpdate(
    { email: req.params.email },
    { $push: { peso: { peso: req.body.peso, data: req.body.data } } },
    { new: true }
  ).then((documents) => {
    let ultimoPeso = documents.peso[documents.peso.length - 1];
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
  usuario = Usuario.findOneAndUpdate(
    { email: req.params.email },
    req.body
  ).then((documents) => {
    res
      .status(201)
      .json({ mensagem: "Usuario atualizado com sucesso", usuario: documents });
  });
});

//Cadastro do usuario
router.post("/signup/:nome", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const usuario = new Usuario({
      nome: req.params.nome,
      email: req.body.email,
      password: hash,
    });
    console.log("Criei o usuario");
    usuario
      .save()

      .then((result) => {
        console.log("Salvei o usuario");
        res.status(201).json({
          mensagem: "Usuario criado",
          resultado: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          erro: err,
        });
      });
  });
});

//Usuario fazendo login
router.post("/login", (req, res, next) => {
  let user;
  Usuario.findOne({ email: req.body.email })
    .then((u) => {
      user = u;
      if (!u) {
        return res.status(401).json({
          mensagem: "email inválido",
        });
      }
      return bcrypt.compare(req.body.password, u.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          mensagem: "senha invalida",
        });
      }
      const token = jwt.sign(
        { email: user.email, id: user._id },
        "minhasenha",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        mensagem: "Login falhou:" + err,
      });
    });
});

//salva o email no banco
router.post("/lembrar", (req, res, next) => {
  const email = new Email({
    to: req.body.email,
    data: req.body.data,
  });

  email
    .save()
    .then(() => {
      console.log("Email salvo!");
      res.status(200).json({ mensagem: "Email salvo no banco" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ mensagem: "Email não salvo: " + err });
    });
});

//checa se tem algum email pendente para enviar a cada 20 mins, das 6h-22h
cron.schedule("0,20,40 6-22 * * *", () => {
  let date = new Date();
  let dataFormatada = Number(
    String(date.getFullYear()) +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0")
  );
  console.log("To rodando a cada minuto", date);
  console.log("Data de hj formatada: ", dataFormatada);
  Email.find({}, function (erro, documentos) {
    //deu erro
    if (erro !== null) {
      console.log("Erro: ", erro);
      return;
    }

    //N tem nenhum email no banco
    if (documentos.length == 0) {
      console.log("Nenhum email pendente");
      return;
    }

    console.log("Documentos: ", documentos);
    documentos.forEach((email) => {
      // console.log("To: ", email.to);
      // console.log("data: ", email.data);

      if (email.data <= dataFormatada) {
        console.log("Ta na hora de enviar o email para " + email.to);

        //criando o transporter
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "exercisetogetherx2@gmail.com",
            pass: "Exercise2gether",
          },
        });

        //configurando o email
        let emailEnviar = {
          from: "exercisetogetherx2@gmail.com",
          to: email.to,
          subject: "Lembre de Treinar!",
          text: "Bora la treinar! Tamo te esperando, hein!",
        };

        //enviando
        transporter.sendMail(emailEnviar, (error, info) => {
          if (error) {
            console.log("Não enviado: ", error);
          } else {
            console.log("Email enviado: " + info.response);
          }
        });

        //dps de enviar, deleta o email do banco
        Email.deleteOne({ to: email.to, data: email.data }, (mensagem) => {
          // console.log(mensagem);
        });
      }
    });
  });
});

//exportando
module.exports = router;
